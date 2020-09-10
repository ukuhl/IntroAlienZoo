import os
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

import time

# Neural network, as used to train the model
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
app.config[ 'SECRET_KEY' ] = 'bjnkdfkfbn34673i38dfjvnskdsndjvk'
socketio = SocketIO( app )

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    # point to experimental code in 'template' directory
    return render_template( './AlienZooMain_template_CON.html' )

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
    # set counterfactual that we will not compute here to nans
    # (variable technically not needed, but wanted in log file for consistency)
    x_cf=[np.nan,np.nan,np.nan,np.nan,np.nan]

    # print model input, computed counterfactual, rounded version (all sanity checks)
    print("input and counterfactual")
    print(x.flatten())
    print(x_cf)
    print(np.round(x_cf))
    print(SNnew)

    # log info for current trial
    logTrialInfo(userIn, x_cf,SNnew)
    # pass info back to client side:
    # new Shub number, -1000 as placeholder value for counterfactual values
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
