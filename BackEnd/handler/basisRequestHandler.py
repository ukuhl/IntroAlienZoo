# -*- coding: utf-8 -*-
import tornado.web

class BasisRequestHandler(tornado.web.RequestHandler):
    def send_custom_error(self, code, msg):
        self.clear()
        self.set_status(code)
        self.finish("<html><body>{0}</body></html>".format(msg))
