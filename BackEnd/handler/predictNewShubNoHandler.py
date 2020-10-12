# -*- coding: utf-8 -*-
import json
import numpy as np
import tornado

from .basisRequestHandler import BasisRequestHandler
from models import compute_counterfactual_of_model


class PredictNewShubNoHandler(BasisRequestHandler):
    def initialize(self, model, datamgr):
        self.model = model
        self.datamgr = datamgr

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, Accept")
        self.set_header("Access-Control-Allow-Methods", "POST, OPTIONS")

    def options(self):
        self.set_status(204)
        self.finish()

    def prepare(self):
        try:
            self.args = None
            if self.request.headers["Content-Type"] == "application/json":
                self.args = tornado.escape.json_decode(self.request.body)
        except Exception as ex:
            pass

    def __compute_counterfactual(self, x, y_pred):
        return compute_counterfactual_of_model(self.model, x, y_pred)

    def __parse_request_body(self):
        if self.args is None:
            self.send_custom_error(400, "Missing or invalid body")
            raise Exception()

        # Get user identifier
        user_id = self.args["userId"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'userId'")
            raise Exception()
        
        # Get number of current shubs
        cur_num_shubs = self.args["numShubs"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'numShubs'")
            raise Exception()

        # Get trial count
        trial_count = self.args["trialCount"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'trialCount'")
            raise Exception()

        # Get block count
        block_count = self.args["blockCount"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'blockCount'")
            raise Exception()

        # Get input variables
        input_vars = self.args["inputVars"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'userId'")
            raise Exception()
        if not isinstance(input_vars, dict):
            self.send_custom_error(400, "Invalid data type of 'inputVars'")
            raise Exception()
        
        return user_id, cur_num_shubs, trial_count, block_count, input_vars

    def post(self):
        # Get all arguments
        try:
            user_id, cur_num_shubs, trial_count, block_count, input_vars = self.__parse_request_body()
        except:
            return

        # Ask database which group the user is in (control vs. experimental group)
        user_info = self.datamgr.get_user_by_userId(user_id)
        if user_info is None:
            self.send_custom_error(400, "Invalid userId")
            return
        control_group = user_info["controlGroup"]

        # Compute a prediction using the model
        x = np.array([input_vars["var1"], input_vars["var2"], input_vars["var3"], input_vars["var4"], input_vars["var5"]], dtype=float).reshape(1, -1)
        pred = self.model.predict(x)#self.model(x).detach().numpy()

        # Compute new number of shubs
        SNnew = int(np.floor(cur_num_shubs * pred))    # new number = old number * GR prediction)
        # never have less than 2 Shubs!
        if SNnew < 2:
            SNnew = 2

        # Compute a counterfactual explanation if the user is in the experimental group
        x_cf = None
        #if control_group is not True:
        x_cf = self.__compute_counterfactual(x, pred)
        
        # Log everything!
        log_data = {
            "oldNumShubs": cur_num_shubs,
            "newNumShubs": SNnew,
            "trialCount": trial_count,
            "blockCount": block_count,
            "innputVars": {
                "var1": input_vars["var1"],
                "var2": input_vars["var2"],
                "var3": input_vars["var3"],
                "var4": input_vars["var4"],
                "var5": input_vars["var5"]
            }
        }
        #if control_group is False:
        if x_cf is not None:
            log_data["counterfactualCountVars"] = {
                    "var1": x_cf[0],
                    "var2": x_cf[1],
                    "var3": x_cf[2],
                    "var4": x_cf[3],
                    "var5": x_cf[4]
                }

        if self.datamgr.log_user_stuff(user_id, json.dumps(log_data)) == False:
            self.send_custom_error(500, "Database error")
            return

        # Send result back to client
        #if control_group is True:
        #   self.write(json.dumps({"newNumShubs": SNnew}))
        #else:
        results = {
            "newNumShubs": SNnew
        }
        if x_cf is not None:
            results["counterfactualCountVars"] = {
                "var1": x_cf[0],
                "var2": x_cf[1],
                "var3": x_cf[2],
                "var4": x_cf[3],
                "var5": x_cf[4]
            }
            results["diffCountVars"] = {
                "var1": x_cf[0] - x[0, 0],
                "var2": x_cf[1] - x[0, 1],
                "var3": x_cf[2] - x[0, 2],
                "var4": x_cf[3] - x[0, 3],
                "var5": x_cf[4] - x[0, 4]
            }

        self.write(json.dumps(results))

        self.finish()
