# -*- coding: utf-8 -*-
import mysql.connector
from crypt import load_key, encrypt


database = ""   # INSERT NAME OF YOUR CHOICE FOR YOUR DB
user_name = ""  # INSERT NAME OF YOUR CHOICE
                                # USER 'user_name'@'localhost' IDENTIFIED BY 'useralienzoopw123456' WILL BE CREATED
                                # WILL GRANT ALL PRIVILEGES ON 'database'. * TO 'user_name'@'localhost';
user_pw = ""

public_key_file = "public_key.bin"

class DataMgr():
    def __init__(self):
        self.db = self.__connect_to_database()
        self.public_key = load_key(public_key_file)
        self.__init_database()

    def __connect_to_database(self):
        return mysql.connector.connect(host="localhost", user=user_name, password=user_pw, database=database)

    def __init_database(self):
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS users (userId TEXT NOT NULL, controlGroup INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS logs (userId TEXT NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, data TEXT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS questionnaire_logs (userId TEXT NOT NULL, questionId INT NOT NULL, var1 INT NOT NULL, var2 INT NOT NULL, var3 INT NOT NULL, var4 INT NOT NULL, var5 INT NOT NULL, var6 INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS demographics (userId TEXT NOT NULL, varAge1 INT NOT NULL, varAge2 INT NOT NULL, varAge3 INT NOT NULL, varAge4 INT NOT NULL, varAge5 INT NOT NULL, varAge6 INT NOT NULL, varAge7 INT NOT NULL, varGender1 INT NOT NULL, varGender2 INT NOT NULL, varGender3 INT NOT NULL, varGender4 INT NOT NULL, varGender5 INT NOT NULL, varGender6 INT NOT NULL, varGender7 INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS elapsedtime_logs (userId TEXT NOT NULL, eventId INT NOT NULL, timeElapsed INT NOT NULL, blockId INT NOT NULL, trialId INT NOT NULL)")
        self.db.cursor().execute("CREATE TABLE IF NOT EXISTS users_payout (userId TEXT NOT NULL, paymentId TEXT NOT NULL)")
        self.db.commit()

    def add_new_user(self, user_id, control_group):
        try:
            db = self.__connect_to_database()
            db.cursor().execute("INSERT INTO users (userId, controlGroup) VALUES(%s,%s)", (user_id, int(control_group)))
            db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def get_user_by_userId(self, user_id):
        try:
            db = self.__connect_to_database()

            cur = db.cursor()
            cur.execute("SELECT controlGroup FROM users WHERE userId=%s", (user_id,))
            result = cur.fetchone()

            return {"userId": user_id, "controlGroup": bool(result[0])}
        except Exception as ex:
            print(ex)
            return None

    def log_questionnaire_answers(self, user_id, question_id, checkbox_values):
        try:
            db = self.__connect_to_database()

            if question_id == -1:
                db.cursor().execute("INSERT INTO demographics (userId, varAge1, varAge2, varAge3, varAge4, varAge5, varAge6, varAge7, varGender1, varGender2, varGender3, varGender4, varGender5, varGender6, varGender7) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                                    (user_id, int(checkbox_values[0]), int(checkbox_values[1]), int(checkbox_values[2]), int(checkbox_values[3]), int(checkbox_values[4]), int(checkbox_values[5]), int(checkbox_values[6]),
                                    int(checkbox_values[7]), int(checkbox_values[8]), int(checkbox_values[9]), int(checkbox_values[10]), int(checkbox_values[11]), int(checkbox_values[12]), int(checkbox_values[13])))

            else:
                db.cursor().execute("INSERT INTO questionnaire_logs (userId, questionId, var1, var2, var3, var4, var5, var6) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)",
                                    (user_id, question_id, int(checkbox_values[0]), int(checkbox_values[1]), int(checkbox_values[2]), int(checkbox_values[3]), int(checkbox_values[4]), int(checkbox_values[5])))
            db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def log_elapsed_time(self, user_id, event_id, time_elapsed, block_id, trial_id):
        try:
            db = self.__connect_to_database()

            db.cursor().execute("INSERT INTO elapsedtime_logs (userId, eventId, timeElapsed, blockId, trialId) VALUES(%s,%s,%s,%s,%s)", (user_id, event_id, time_elapsed, block_id, trial_id))
            db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def log_user_stuff(self, user_id, data):
        try:
            db = self.__connect_to_database()

            db.cursor().execute("INSERT INTO logs (userId, data) VALUES(%s,%s)", (user_id, data))
            db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False

    def log_user_payment(self, user_id, payment_id):
        try:
            db = self.__connect_to_database()

            payment_id = encrypt(payment_id, self.public_key)   # Encrypt payment_id

            db.cursor().execute("INSERT INTO users_payout (userId, paymentId) VALUES(%s,%s)", (user_id, payment_id))
            db.commit()

            return True
        except Exception as ex:
            print(ex)
            return False
