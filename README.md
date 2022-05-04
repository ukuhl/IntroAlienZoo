# README

This repository provides code, data, and analysis scripts for the Alien Zoo framework as used in the study:
["Let's Go to the Alien Zoo: Introducing an Experimental Framework to Study Usability of Counterfactual Explanations for Machine Learning"](Publication/IAZ_arXiv_ukuhl.pdf)

Detailed motivation and rationale are explained in the paper. In short, we provide this framework as a utility to run user studies to perform human level evaluations of counterfactual explanations (CFEs) for machine learning (ML).

## Rough overview of implementation logic

Implementation of the experimental framework follows a clear separation into python-based [BackEnd](BackEnd/), and a javascript based [FronEnd](FrontEnd/). 

## I want to replicate the experiments as described in the paper!

Very well! Let's go:

### Requirements and prerequisites

There is a list of steps that first need to be done on the BackEnd side before we can go to the Alien Zoo.

0. Whatever you do, use Python3.
1. `cd BackEnd`
2. Install all requirements as listed in `REQUIREMENTS.txt`.
3. Install [`CEML`](https://github.com/andreArtelt/ceml) (Note: required Python 3.6 or higher!):
`pip install ceml`
4. Setup an MySQL database (databse name, user name and password of your choice). Then, make sure the credentials and database in `dbmgr.py` (lines 6-10) fit your set up.
5. Run `python crypt.py` (generates key pair; relevant for encrypting userId information).
6. Decide which experiment from our study you want to recreate. The default is Experiment 1, but you can change that via the variable `expNo` in line 17 in file `BackEnd/models.py`.

### Start up the server

Finally, we can start the server: `python server.py` 
The server is listening on port **8888**, so pull up a browser and go to the Alien Zoo under [localhost:8888/](localhost:8888/).

### Wrapping up, export data, clear database

When you're done, stop the running server with `Ctrl+C`.

Run `BackEnd/db_export.py` to export data from the database. This command generates 6 files from the content of the database. For details on these files and coding of respective data, see [here](???).

Finally, when you are done with the code, run 
`python BackEnd/reset_database.py user_name user_pw`
to reset the database again.

# FAQ
## How was synthetic data used for model training generated?
We included the code on how we generated the data as R Markdown documents under BackEnd/modelData:
* For Experiment 1: [`DataSim_Exp1.Rmd`](BackEnd/modelData/DataSim_Exp1.Rmd) / [`DataSim_Exp1.pdf`](BackEnd/modelData/DataSim_Exp1.pdf)
* For Experiment 2: [`DataSim_Exp2.Rmd`](BackEnd/modelData/DataSim_Exp2.Rmd) / [`DataSim_Exp2.pdf`](BackEnd/modelData/DataSim_Exp2.pdf)

## How were models trained?
We trained decision tree regression model for each experiment. Lines 44-80 in `BackEnd/models.py` show the code used for model training. Note that pre-trained models are already available, both [model_IAZ_EXP1.joblib](BackEnd/modelData/model_IAZ_EXP1.joblib) and [model_IAZ_EXP1.joblib](BackEnd/modelData/model_IAZ_EXP1.joblib).

## I want a different port!
Fair enough: The port can be changed in line 15 in file `BackEnd/server.py`.

## It takes ages until the buttons appear. How can I change that?
The delays are chosen as used in the reported Experiments. If you want to change them, check lines 84-86 in file `FrontEnd/gameUI.js`. Via this file, you can also control other details of the procedure (trials per block, number of blocks, number and placement of attention trials, etc.)
Note that long delays are an effective measure to ensure that participants will really engage with the materials (instead of quickly brushing over everything).

## I want to re-create the statistical analysis
We provide R Markdown documents of the entire statistical evaluation, together with the original user data acquired in both experiments:
* For Experiment 1: `UserData/*_EXP1.csv` / [`uk_introAlienZoo_analysis_EXP1.Rmd`](StatisticalEvaluation/uk_introAlienZoo_analysis_EXP1.Rmd) / [`uk_introAlienZoo_analysis_EXP1.pdf`](StatisticalEvaluation/uk_introAlienZoo_analysis_EXP1.pdf)
* For Experiment 2: `UserData/*_EXP2.csv` / [`uk_introAlienZoo_analysis_EXP2.Rmd`](StatisticalEvaluation/uk_introAlienZoo_analysis_EXP2.Rmd) / [`uk_introAlienZoo_analysis_EXP2.pdf`](StatisticalEvaluation/uk_introAlienZoo_analysis_EXP2.pdf)
Note that these files can also be used to recreate all plots (and more!) from the paper.

# License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
