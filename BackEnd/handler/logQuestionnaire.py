# -*- coding: utf-8 -*-
import tornado

from .basisRequestHandler import BasisRequestHandler


class LogQuestionnaireHandler(BasisRequestHandler):
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
        
        # Get question id
        question_id = self.args["questionId"]
        if question_id is None:
            self.send_custom_error(400, "Missing field 'questionId'")
            raise Exception()

        # Get checkbox values
        checkbox_values = self.args["checkboxValues"]
        if checkbox_values is None:
            self.send_custom_error(400, "Missing field 'checkboxValues'")
            raise Exception()

        return user_id, question_id, checkbox_values

    def post(self):
        # Parse data
        try:
            user_id, question_id, checkbox_values = self.__parse_request_body()
        except:
            return

        # Log data
        if self.datamgr.log_questionnaire_answers(user_id, question_id, checkbox_values) is False:
            self.send_custom_error(500, "Internal server error")
        else:
            self.finish()
