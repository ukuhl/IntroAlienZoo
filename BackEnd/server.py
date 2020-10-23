#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
from tornado.ioloop import IOLoop
import tornado.web

from models import load_model_from_file, Model, build_model
from dbmgr import DataMgr

from handler.gameStartHandler import GameStartHandler
from handler.predictNewShubNoHandler import PredictNewShubNoHandler
from handler.logElapsedTimes import LogElapsedTimesHandler
from handler.logQuestionnaire import LogQuestionnaireHandler


port = 8888


class WebServer(tornado.web.Application):
    def __init__(self):
        self.datamgr = DataMgr()
        #self.model = load_model_from_file()
        self.model = build_model()

        handlers = [
            (r'/', tornado.web.RedirectHandler, dict(url=r"/index.htm")),
            (r'/(index\.htm)', tornado.web.StaticFileHandler, {'path': '../FrontEnd'}),
            (r'/js/(.*)', tornado.web.StaticFileHandler, {'path': '../FrontEnd/js'}),
            (r'/(favicon\.ico)', tornado.web.StaticFileHandler, {'path': '../FrontEnd/static'}),
            (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': '../FrontEnd/static'}),
            (r'/api/gameStart', GameStartHandler, dict(datamgr=self.datamgr)),
            (r'/api/predictNewShubNo', PredictNewShubNoHandler, dict(model=self.model, datamgr=self.datamgr)),
            (r'/api/log/questionnaireAnswer', LogQuestionnaireHandler, dict(datamgr=self.datamgr)),
            (r'/api/log/elapsedTime', LogElapsedTimesHandler, dict(datamgr=self.datamgr))
        ]

        tornado.web.Application.__init__(self, handlers)


def runServer():
    WebServer().listen(port)
    IOLoop.instance().start()


if __name__ == "__main__":
    # Run webserver
    runServer()
