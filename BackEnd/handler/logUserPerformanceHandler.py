# -*- coding: utf-8 -*-
import tornado
import json

from .basisRequestHandler import BasisRequestHandler


class LogUserPerformanceHandler(BasisRequestHandler):
    def initialize(self, datamgr):
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

    def __parse_request_body(self):
        if self.args is None:
            self.send_custom_error(400, "Missing or invalid body")
            raise Exception()

        user_id = self.args["userId"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'userId'")
            raise Exception()
        
        trial_count = self.args["trialCount"]
        if trial_count is None:
            self.send_custom_error(400, "Missing field 'trialCount'")
            raise Exception()

        block_count = self.args["blockCount"]
        if block_count is None:
            self.send_custom_error(400, "Missing field 'blockCount'")
            raise Exception()


        plants = self.args["plants"]
        if plants is None:
            self.send_custom_error(400, "Missing field 'plants'")
            raise Exception()
        
        cf_plants = self.args["cfPlants"]
        if cf_plants is None:
            self.send_custom_error(400, "Missing field 'cfPlants'")
            raise Exception()

        n_shub_old = self.args["shubNoOld"]
        if n_shub_old is None:
            self.send_custom_error(400, "Missing field 'plants'")
            raise Exception()

        n_shub_new = self.args["shubNoNew"]
        if n_shub_new is None:
            self.send_custom_error(400, "Missing field 'shubNoNew'")
            raise Exception()

        return user_id, trial_count, block_count, plants, cf_plants, n_shub_old, n_shub_new

    def post(self):
        # Parse data
        try:
            user_id, trial_count, block_count, plants, cf_plants, n_shub_old, n_shub_new = self.__parse_request_body()
        except:
            return

        # Log data
        log_data = {
            "trialCount": trial_count,
            "blockCount": block_count,
            "plants": plants,
            "cfPlants": cf_plants,
            "shubNoOld": n_shub_old,
            "shubNoNew": n_shub_new
        }

        if self.datamgr.log_user_stuff(user_id, json.dumps(log_data)) is False:
            self.send_custom_error(500, "Internal server error")
        else:
            self.finish()
