# -*- coding: utf-8 -*-
import sqlite3


class DataMgr():
    def __init__(self, db_file="storage.sqlite"):
        self.db = sqlite3.connect(db_file)
        self.__init_database()

    def __init_database(self):
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS users (userId TEXT NOT NULL, controlGroup INT NOT NULL)")
        self.db.commit()

    def add_new_user(self, user_id, control_group):
        try:
            self.db.cursor().execute("INSERT INTO users (userId, controlGroup) VALUES(?,?)", (user_id, int(control_group)))
            self.db.commit()
            
            return True
        except Exception as ex:
            print(ex)
            return False

    def get_user_by_userId(self, user_id):
        try:
            cur = self.db.cursor()
            cur.execute("SELECT controlGroup FROM users WHERE userId=?", (user_id,))
            result = cur.fetchone()
            
            return {"userId": user_id, "controlGroup": bool(result[0])}
        except Exception as ex:
            print(ex)
            return None

    def log_user_stuff(self):
        pass
