from flask import Flask, redirect, send_from_directory, render_template
from flask_socketio import SocketIO, emit
from joblib import dump, load
from ceml.sklearn import generate_counterfactual
import numpy as np
import uuid
import csv
import torch

import torch.nn.functional as F

from ceml.torch import generate_counterfactual
from ceml.backend.torch.costfunctions import SquaredError
from ceml.model import ModelWithLoss

# Neural network - Softmax regression
class Model(torch.nn.Module, ModelWithLoss):
    def __init__(self, input_size):
        super(Model, self).__init__()
        # define three layers
        self.linear1 = torch.nn.Linear(input_size, 200)
        self.linear2 = torch.nn.Linear(200, 100)
        self.linear3 = torch.nn.Linear(100, 1)

    def forward(self, x):
        # x gets passed a numpy, convert to tensor and double
        x = torch.Tensor(x).double()
        # forward pass, using leaky ReLU through all layers
        x = F.leaky_relu(self.linear1(x))
        x = F.leaky_relu(self.linear2(x))
        # return output from output layer
        return self.linear3(x)

    def predict(self, x, dim=1):
        #return torch.argmax(self.forward(x), dim=dim)
        return self.forward(x)

    def get_loss(self, y_target, pred=None):
        #return L2Cost(x_orig=x)
        return SquaredError(input_to_output=self.predict, y_target=y_target)

# instantiate the Flask app
app = Flask(__name__,
    static_folder='./static',
    template_folder='./templates')

# this should be unique
app.config[ 'SECRET_KEY' ] = 'i38dfjvnskdsndjvkbjnkdfkfbn34673'
socketio = SocketIO( app )

@app.route('/')
def index():
    # point to experimental code in 'template' directory
    return render_template( './AlienZooMain_template_EXP.html' )

# this is an identifier for subID
def generate_unique_identifier():
    return uuid.uuid4().hex

# socket action: generate subID and log file after user entered game
@socketio.on('gameStartEvent')
# handle the data as json
def handle_gameStartEvent(json):
    # generate subID
    subID = generate_unique_identifier()
    # log which ID just started the game
    f=open('log/gameStartEvent.txt','a')
    f.write(str(subID)+'\n')
    f.close()
    # generate log file with user name for exp info
    f=open('log/'+str(subID)+'.txt','a')
    header=['ID','blockNo', 'trialNo', 'inputPlant1', 'inputPlant2', 'inputPlant3', 'inputPlant4', 'inputPlant5','cf_inputPlant1', 'cf_inputPlant2', 'cf_inputPlant3', 'cf_inputPlant4', 'cf_inputPlant5','shubNoOld', 'shubNoNew']
    with f:
        writer = csv.writer(f)
        writer.writerow(header)
    f.close()
    # and send subID as 'subID' event from server to client
    socketio.emit( 'subID', str(subID))

# socket action: compute new ShubNo, let pre-trained model predict it!
@socketio.on('predictNewShubNo')
# receives user input from client side
def handle_predictNewShubNo(userIn):
    # print passed input (sanity check)
    print(userIn);
    # load pre-computed model
    # model = torch.load('models/PyTorchNetDataSet1_Regression_2000epochs_SquaredError.joblib');
    model = torch.load('models/PyTorchNetDataSet1_Regression_500epochs_SquaredError.joblib');
    # prepare input for model to get prediction
    x=np.array([userIn["var1"],userIn["var2"],userIn["var3"],userIn["var4"],userIn["var5"]],dtype=float).reshape(1, -1);
    # predict new growth rate
    pred=model(x)
    # predict new growth rate (sanity check)
    print(pred)

    # new number = old number * GR prediction)
    SNnew=int(np.floor(userIn["oN"]*pred.detach().numpy()))
    # never have less than 2 Shubs!
    if SNnew < 2:
        SNnew = 2
    # predict counterfactual
    # Whitelist of features - list of features we can change/use when computing a counterfactual
    features_whitelist = [0, 1, 2, 3, 4] # use all 5 features

    # initialize counterfactual variable (tmp and final) with nans for now
    x_cf_current=[np.nan,np.nan,np.nan,np.nan,np.nan]
    x_cf=[np.nan,np.nan,np.nan,np.nan,np.nan]
    y_cf=0.0
    delta=0.0
    # print where we are (sanity check)
    print("enter for loop")
    # try to compute counterfactual for increasingly good y_target values
    # increment y_target value by 0.01 for each try
    # when a valid CF is found, be happy and return it
    for i in np.arange(model.predict(x).detach().numpy()+0.05, 2.0, 0.01):
        # y_target is current index
        y_target = i
        # print current y_target (sanity check!)
        print(y_target)
        # in case we don't achieve `y_target` exactly, be happy if we do not deviate more than 0.05 from it
        done = lambda z: np.abs(y_target - z) <= 0.05
        # generate_counterfactual
        try:
            x_cf_current, y_cf, delta = generate_counterfactual(model, x.flatten(), y_target=y_target.item(), features_whitelist=features_whitelist, C=0.001, regularization="l2", optimizer="nelder-mead", done=done, return_as_dict=False)
        # if something went wrong (most likely: CF not found exception)
        except Exception as e:
            # print exception to know what went on
            print(repr(e))
        # round the computed CF
        x_cf_round = np.round(x_cf_current)
        # set -0 entries to 0
        x_cf_round[x_cf_round == -0] = 0
        # more prints (all sanity checks)
        print("INPUT")
        print(x.flatten())
        print("ROUNDED CF:")
        print(x_cf_round)
        #if there is no NaN in the computed cf, check if it's a valid CF
        if not np.isnan(x_cf_round).any():
            # is result different from input when rounded?
            comparison = x_cf_round == x.flatten()
            if not comparison.all():
                print("CF and input different! Check!")
                # does result contain no number larger than 6
                if all(vals <= 6 for vals in x_cf_round):
                    print("CF does not conatain vals > 6! Check!")
                    # if no entry is smaller than 0
                    if all(vals >= 0 for vals in x_cf_round):
                        print("CF does not conatain vals < 0! Check!")
                        # accept solution and break
                        x_cf=x_cf_round
                        break

    # print model input, computed counterfactual, rounded version (all sanity checks)
    print("input and counterfactual")
    print(x.flatten())
    print(x_cf)
    print(np.round(x_cf))
    x_cf=np.round(x_cf)
    print(SNnew)

    # log info for current trial
    logTrialInfo(userIn, x_cf,SNnew)
    # pass info back to client side:
    # new Shub number, CF info if a CF was found
    if not np.isnan(x_cf).any():
        socketio.emit( 'newShubNo', {'SNnew': SNnew, 'cf_var1': x_cf[0], 'cf_var2': x_cf[1], 'cf_var3': x_cf[2], 'cf_var4': x_cf[3], 'cf_var5': x_cf[4], 'diff_var1': x_cf[0]-x.flatten()[0], 'diff_var2': x_cf[1]-x.flatten()[1], 'diff_var3': x_cf[2]-x.flatten()[2], 'diff_var4': x_cf[3]-x.flatten()[3], 'diff_var5': x_cf[4]-x.flatten()[4]})
    else:
        # if no CF was found, pass on new Shub number and -1000 as placeholder value for counterfactual values
        socketio.emit( 'newShubNo', {'SNnew': SNnew, 'cf_var1':  -1000, 'cf_var2': -1000, 'cf_var3': -1000, 'cf_var4': -1000, 'cf_var5': -1000, 'diff_var1': 0, 'diff_var2': 0, 'diff_var3': 0, 'diff_var4': 0, 'diff_var5': 0})

# function log trial info
# received user unput, computed counterfactual and new Shub number
def logTrialInfo(userIn, cf,SNnew):
    # write trial info to respective log file
    f=open('log/'+str(userIn['subID'])+'.txt','a')
    logdat=[userIn["subID"],userIn["bC"],userIn["tC"],userIn["var1"], userIn["var2"], userIn["var3"], userIn["var4"], userIn["var5"],cf[0], cf[1], cf[2], cf[3], cf[4],userIn["oN"], SNnew];
    with f:
        writer = csv.writer(f)
        writer.writerow([logdat])
    f.close()

if __name__ == '__main__':
    # run the socketio instance we've defined above
    socketio.run( app, debug = True )
