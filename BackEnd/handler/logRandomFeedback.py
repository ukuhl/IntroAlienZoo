# -*- coding: utf-8 -*-
import tornado
import json

from .basisRequestHandler import BasisRequestHandler


class LogUserPaymentHandler(BasisRequestHandler):
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

        # Get user identifier
        user_id = self.args["userId"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'userId'")
            raise Exception()
        
        # Get payment identifier
        paymentId = self.args["paymentId"]
        if paymentId is None:
            self.send_custom_error(400, "Missing field 'paymentId'")
            raise Exception()

        return user_id, paymentId

    def post(self):
        # Parse data
        try:
            user_id, payment_id = self.__parse_request_body()
        except:
            return

        # Log data
        if self.datamgr.log_user_payment(user_id, payment_id) is False:
            self.send_custom_error(500, "Internal server error")
        else:
            self.finish()



class LogRandomFeedbackHandler(BasisRequestHandler):
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

        # Get user identifier
        user_id = self.args["userId"]
        if user_id is None:
            self.send_custom_error(400, "Missing field 'userId'")
            raise Exception()
        
        # Get trial count
        trial_count = self.args["trialCount"]
        if trial_count is None:
            self.send_custom_error(400, "Missing field 'trialCount'")
            raise Exception()

        # Get block count
        block_count = self.args["blockCount"]
        if block_count is None:
            self.send_custom_error(400, "Missing field 'blockCount'")
            raise Exception()

        # Get random feedback indices
        rand_feedback_idx = self.args["randFeedbackIndices"]
        if rand_feedback_idx is None:
            self.send_custom_error(400, "Missing field 'randFeedbackIndices'")
            raise Exception()

        return user_id, trial_count, block_count, rand_feedback_idx

    def post(self):
        # Parse data
        try:
            user_id, trial_count, block_count, rand_feedback_idx = self.__parse_request_body()
        except:
            return

        # Log data
        log_data = {
            "trialCount": trial_count,
            "blockCount": block_count,
            "randFeedbackIndices": rand_feedback_idx
        }

        if self.datamgr.log_user_stuff(user_id, json.dumps(log_data)) is False:
            self.send_custom_error(500, "Internal server error")
        else:
            self.finish()
