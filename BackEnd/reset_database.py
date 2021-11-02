# -*- coding: utf-8 -*-
import sys
import mysql.connector


database = "alienzoo"


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: <root_user_name> <root_user_password>")
    else:
        try:
            user_name = sys.argv[1]
            user_pw = sys.argv[2]

            db = mysql.connector.connect(host="localhost", user=user_name, password=user_pw, database=database)
            db.cursor().execute("DROP TABLE users")
            db.cursor().execute("DROP TABLE logs")
            db.cursor().execute("DROP TABLE questionnaire_logs")
            db.cursor().execute("DROP TABLE demographics")
            db.cursor().execute("DROP TABLE elapsedtime_logs")
            db.cursor().execute("DROP TABLE users_payout")
            db.commit()
        except Exception as ex:
            print(ex)
