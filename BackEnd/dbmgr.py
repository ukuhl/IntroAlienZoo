# -*- coding: utf-8 -*-
import mysql.connector


user_name = "user"
user_pw = "userpw123456"
database = "alienzoo"


class DataMgr():
    def __init__(self):
        self.db = mysql.connector.connect(host="localhost", user=user_name, password=user_pw, database=database)
        self.__init_database()

    def __init_database(self):
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS users (userId TEXT NOT NULL, controlGroup INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS logs (userId TEXT NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, data TEXT NOT NULL)")
        self.db.commit()

    def add_new_user(self, user_id, control_group):
        try:
            self.db.cursor().execute("INSERT INTO users (userId, controlGroup) VALUES(%s,%s)", (user_id, int(control_group)))
            self.db.commit()
            
            return True
        except Exception as ex:
            print(ex)
            return False

    def get_user_by_userId(self, user_id):
        try:
            cur = self.db.cursor()
            cur.execute("SELECT controlGroup FROM users WHERE userId=%s", (user_id,))
            result = cur.fetchone()
            
            return {"userId": user_id, "controlGroup": bool(result[0])}
        except Exception as ex:
            print(ex)
            return None

    def log_user_stuff(self, user_id, data):
        try:
            self.db.cursor().execute("INSERT INTO logs (userId, data) VALUES(%s,%s)", (user_id, data))
            self.db.commit()
            
            return True
        except Exception as ex:
            print(ex)
            return False
