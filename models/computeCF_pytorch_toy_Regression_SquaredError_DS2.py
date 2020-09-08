#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import torch
torch.manual_seed(424242)
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, explained_variance_score, mean_squared_error, r2_score

import torch.nn.functional as F
from torch.autograd import Variable
import matplotlib.pyplot as plt

from ceml.torch import generate_counterfactual
from ceml.backend.torch.costfunctions import SquaredError
from ceml.model import ModelWithLoss

## torch.device = gpu

# Neural network - Softmax regression
class Model(torch.nn.Module, ModelWithLoss):
    #def __init__(self, input_size, num_classes):
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

    #def predict_proba(self, x):
    #    # don't use softmax for regression, as target values may be > 1
    #    return self.forward(x)

    def predict(self, x, dim=1):
        #return torch.argmax(self.forward(x), dim=dim)
        return self.forward(x)

    def get_loss(self, y_target, pred=None):
        #return L2Cost(x_orig=x)
        return SquaredError(input_to_output=self.predict, y_target=y_target)

if __name__ == "__main__":

    # load data
    df = pd.read_csv("AlienZooDataSet2.csv")
    X = np.asarray([df.Var1,df.Var2,df.Var3,df.Var4,df.Var5], dtype=np.float32).T
    X = torch.from_numpy(X)

    # target values (continues) are coded in GR
    labels=torch.tensor(df['GR'].values)

    # wrap data in 'Variable'
    x = Variable(X) ## probably not necessary!
    lab = Variable(labels)
    # reformat lab
    lab=torch.unsqueeze(lab, 1)

    # generate training / testing data
    x, x_test, lab, lab_test = train_test_split(x, lab, test_size=0.2, random_state=1)

    # let's get real:
    # get datasize to define input layer
    numSamples,numFeatures = x.size()
    # define our net
    net = Model(numFeatures)
    net = net.double()

    # use adam optimizer
    optimizer = torch.optim.Adam(net.parameters(), lr=0.05)
    # mean squared loss for regression
    loss_func = torch.nn.MSELoss()

    ### ### ### ### comment out, load model trained this way:
    # start training
    for t in range(2000):
    #for t in range(10):
        # pass input x as numpy
        prediction = net(x.numpy())
        # get loss (args are 1. nn output, 2. target)
        loss = loss_func(prediction, lab)
        # clear gradients for next train
        optimizer.zero_grad()
        # backpropagation, compute gradients
        loss.backward()
        # apply gradients
        optimizer.step()
        # occasionally print loss, making sure it declines
        if t % 100 == 0:
            print(t)
            print("loss:")
            print(loss)

    # save trained model
    print("save model")
    torch.save(net,'PyTorchNetDataSet2_Regression_2000epochs_SquaredError.joblib')
    # ### ### ### ###

    # load the model
    print("load model")
    net = torch.load('PyTorchNetDataSet2_Regression_2000epochs_SquaredError.joblib')

    # Model evaluation on test data
    print()
    print("Model evaluation on test data")
    #y_pred = model.predict(x_test).detach().numpy()
    y_pred = net(x_test.numpy()).detach().numpy()
    # explained variance: The best possible score is 1.0, lower values are worse.
    evs=explained_variance_score(lab_test, y_pred)
    print("Explained variance score: "+str(evs))
    # mean squared error - the lower, the better
    mse=mean_squared_error(lab_test, y_pred)
    print("MSE: "+str(mse))
    # Rsquared - Best possible score: 1.0 (may be negative)
    r2=r2_score(lab_test, y_pred)
    print("Rsquared: "+str(r2))
    print()
    print("Try out a few predictions")
    # try (and fail) for all possible target classes
    for i in range(0, 10):
        print()
        print("x:")
        print(x_test[i].numpy())
        print("true label:")
        print(lab_test[i])
        print("prediction:")
        pred=net(x_test[i].numpy())
        print(pred)
        print()

    print("Try net with CEML")
    # select a single data point
    # check prediction with model beforehand
    x_orig = x_test[3].numpy()
    print()
    print("x_orig:")
    print(x_orig)
    print(type(x_orig))
    pred_orig=net(x_orig)
    print("pred_orig:")
    print(pred_orig)
    print(type(pred_orig))

    # Whitelist of features we can use/change when computing the counterfactual
    features_whitelist = [0, 1, 2, 3, 4] # Use all features (None would do the same)

    # try (and fail?) for possible target classes
    for t in range(0, 20):
        try:
            print()
            ttest=t/10.
            print('y_target:')
            print(ttest)
            print(type(ttest))
            done = lambda z: np.abs(ttest - z) <= 0.05     # Since we might not be able to achieve `y_target` exactly, we tell ceml that we are happy if we do not deviate more than 0.5 from it.
            cf, y_cf, delta = generate_counterfactual(net, x_orig, y_target=ttest, features_whitelist=features_whitelist, C=0.001, regularization="l2", optimizer="nelder-mead", done=done, return_as_dict=False)
            print("cf")
            print(cf)
            print(x_orig)
            print(np.round(cf))
            print()

        except Exception as e: # work on python 3.x
            print(repr(e))
