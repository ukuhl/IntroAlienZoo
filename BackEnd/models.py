# -*- coding: utf-8 -*-
import torch
import torch.nn.functional as F
import numpy as np

from ceml.torch import generate_counterfactual
from ceml.backend.torch.costfunctions import SquaredError
from ceml.model import ModelWithLoss

# Neural network - Linear regression
class Model(torch.nn.Module, ModelWithLoss):
    def __init__(self, input_size):
        super(Model, self).__init__()
        self.linear1 = torch.nn.Linear(input_size, 200)
        self.linear2 = torch.nn.Linear(200, 100)
        self.linear3 = torch.nn.Linear(100, 1)

    def forward(self, x):
        x = torch.Tensor(x).double()
        x = F.leaky_relu(self.linear1(x))
        x = F.leaky_relu(self.linear2(x))

        return self.linear3(x)

    def predict(self, x, dim=1):
        return self.forward(x)

    def get_loss(self, y_target, pred=None):
        return SquaredError(input_to_output=self.predict, y_target=y_target)


# Load stored model parameters
def load_model_from_file(file_path='modelsStuff/PyTorchNetDataSet1_Regression_500epochs_SquaredError.joblib'):
#def load_model_from_file(file_path='modelsStuff/PyTorchNetDataSet1_Regression_2000epochs_SquaredError.joblib'):
    return torch.load(file_path)


# Compute counterfactual
def compute_counterfactual_of_model(model, x, y_pred, features_whitelist = [0, 1, 2, 3, 4]):
    # initialize counterfactual variable (tmp and final) with nans for now
    x_cf_current = [np.nan,np.nan,np.nan,np.nan,np.nan]
    x_cf = [np.nan,np.nan,np.nan,np.nan,np.nan]
    y_cf = 0.0
    delta = 0.0

    # try to compute counterfactual for increasingly good y_target values
    # increment y_target value by 0.01 for each try
    # when a valid CF is found, be happy and return it
    for y_target in np.arange(y_pred + 0.05, 2.0, 0.01):
        # in case we don't achieve `y_target` exactly, be happy if we do not deviate more than 0.05 from it
        done = lambda z: np.abs(y_target - z) <= 0.05
        # generate_counterfactual
        try:
            x_cf_current, y_cf, delta = generate_counterfactual(model, x.flatten(), y_target=y_target.item(), features_whitelist=features_whitelist, C=0.001, regularization="l2", optimizer="nelder-mead", done=done, return_as_dict=False)
        # if something went wrong (most likely: CF not found exception)
        except Exception as e:
            # print exception to know what went on
            print(repr(e))
            pass
        # round the computed CF
        x_cf_round = np.round(x_cf_current)
        # set -0 entries to 0
        x_cf_round[x_cf_round == -0] = 0
        # more prints (all sanity checks)
        #print("INPUT")
        #print(x.flatten())
        #print("ROUNDED CF:")
        #print(x_cf_round)
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
    x_cf = np.round(x_cf)
    #print(SNnew)

    return x_cf
