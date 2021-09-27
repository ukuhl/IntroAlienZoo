# -*- coding: utf-8 -*-
import mysql.connector


database = "alienzoo"   # CREATE DATABASE alienzoo;
user_name = "user_alienzoo"  # CREATE USER 'user_alienzoo'@'localhost' IDENTIFIED BY 'useralienzoopw123456'; GRANT ALL PRIVILEGES ON alienzoo. * TO 'user_alienzoo'@'localhost';
user_pw = "useralienzoopw123456"


class DataMgr():
    def __init__(self):
        self.db = mysql.connector.connect(host="localhost", user=user_name, password=user_pw, database=database)
        self.__init_database()

    def __init_database(self):
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS users (userId TEXT NOT NULL, controlGroup INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS logs (userId TEXT NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, data TEXT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS questionnaire_logs (userId TEXT NOT NULL, questionId INT NOT NULL, var1 INT NOT NULL, var2 INT NOT NULL, var3 INT NOT NULL, var4 INT NOT NULL, var5 INT NOT NULL, var6 INT NOT NULL)");
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS elapsedtime_logs (userId TEXT NOT NULL, eventId INT NOT NULL, timeElapsed INT NOT NULL)")
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

    def log_questionnaire_answers(self, user_id, question_id, checkbox_values):
        try:
            self.db.cursor().execute("INSERT INTO questionnaire_logs (userId, questionId, var1, var2, var3, var4, var5, var6) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)",
                                    (user_id, question_id, int(checkbox_values[0]), int(checkbox_values[1]), int(checkbox_values[2]), int(checkbox_values[3]), int(checkbox_values[4]), int(checkbox_values[5])))
            self.db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def log_elapsed_time(self, user_id, event_id, time_elapsed):
        try:
            self.db.cursor().execute("INSERT INTO elapsedtime_logs (userId, eventId, timeElapsed) VALUES(%s,%s,%s)", (user_id, event_id, time_elapsed))
            self.db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def log_user_stuff(self, user_id, data):
        try:
            self.db.cursor().execute("INSERT INTO logs (userId, data) VALUES(%s,%s)", (user_id, data))
            self.db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False
