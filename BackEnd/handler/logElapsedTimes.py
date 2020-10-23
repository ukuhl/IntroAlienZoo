# -*- coding: utf-8 -*-
import tornado

from .basisRequestHandler import BasisRequestHandler


class LogElapsedTimesHandler(BasisRequestHandler):
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
        
        # Get event id
        event_id = self.args["eventId"]
        if event_id is None:
            self.send_custom_error(400, "Missing field 'eventId'")
            raise Exception()

        # Get time
        time_elapsed = self.args["timeElapsed"]
        if time_elapsed is None:
            self.send_custom_error(400, "Missing field 'timeElapsed'")
            raise Exception()

        return user_id, event_id, time_elapsed

    def post(self):
        # Parse data
        try:
            user_id, event_id, time_elapsed = self.__parse_request_body()
        except:
            return

        # Log data
        if self.datamgr.log_elapsed_time(user_id, event_id, time_elapsed) is False:
            self.send_custom_error(500, "Internal server error")
        else:
            self.finish()
