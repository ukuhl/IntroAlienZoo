# -*- coding: utf-8 -*-
from datetime import time
import pandas as pd
import json
import mysql.connector


database = "alienzoo"
user_name = "user_alienzoo"
user_pw = "useralienzoopw123456"


class DataMgr():
    def __init__(self):
        self.db = mysql.connector.connect(host="localhost", user=user_name, password=user_pw, database=database)
        
        # Create dictionary where userId is mapped to group
        self.user_groups = {}
        self._get_users_groups()

    def _get_users_groups(self):
        try:
            cur = self.db.cursor()
            cur.execute("SELECT userId, controlGroup FROM users")
            for row in cur.fetchall():
                self.user_groups[str(row[0])] = int(row[1])

            return True
        except Exception as ex:
            print(ex)
            return False

    def export_performance(self, file_out="performance.csv"):
        try:
            data_userId = []
            data_group = []
            data_blockNo = []
            data_trialNo = []
            data_plant1 = [];data_plant2 = [];data_plant3 = [];data_plant4 = [];data_plant5 = []
            data_CFplant1 = [];data_CFplant2 = [];data_CFplant3 = [];data_CFplant4 = [];data_CFplant5 = []
            data_shubNoOld = []
            data_shubNoNew = []
        
            cur = self.db.cursor()
            cur.execute("SELECT userId, data FROM logs")
            for row in cur.fetchall():
                d = json.loads(row[1])
                if "cfPlants" in d:
                    data_userId.append(str(row[0]))
                    data_group.append(self.user_groups[str(row[0])])
                    data_blockNo.append(int(d["blockCount"]))
                    data_trialNo.append(int(d["trialCount"]))
                    data_shubNoOld.append(int(d["shubNoOld"]))
                    data_shubNoNew.append(int(d["shubNoNew"]))
                    plants = d["plants"];data_plant1.append(plants[0]);data_plant2.append(plants[1]);data_plant3.append(plants[2]);data_plant4.append(plants[3]);data_plant5.append(plants[4])
                    cfPlants = d["cfPlants"];data_CFplant1.append(cfPlants[0]);data_CFplant2.append(cfPlants[1]);data_CFplant3.append(cfPlants[2]);data_CFplant4.append(cfPlants[3]);data_CFplant5.append(cfPlants[4])

            df = pd.DataFrame({"userId": data_userId, "group": data_group, "blockNo": data_blockNo, "trialNo": data_trialNo,
                                "plant1": data_plant1, "plant2": data_plant2, "plant3": data_plant3, "plant4": data_plant4, "plant5": data_plant5,
                                "CFplant1": data_CFplant1, "CFplant2": data_CFplant2, "CFplant3": data_CFplant3, "CFplant4": data_CFplant4, "CFplant5": data_CFplant5,
                                "shubNoOld": data_shubNoOld, "shubNoNew": data_shubNoNew})
            df.to_csv(file_out, index=False)

            return True
        except Exception as ex:
            print(ex)
            return False

    def export_reactionTimes(self, file_out="reactionTime.csv"):
        try:
            data = {}

            data_userId = []
            data_group = []
            data_BlockNr = []
            data_TrialNr = []
            data_timeAgreementScene = []
            data_timeStartScene = []
            data_timeStableUntilFeeding = []
            data_timeFeedbackScene = []
        
            cur = self.db.cursor()
            cur.execute("SELECT userId, eventId, timeElapsed, blockId, trialId FROM elapsedtime_logs")
            for row in cur.fetchall():
                user_id = str(row[0])
                event_id = int(row[1])
                time_elapsed = int(row[2])
                block_id = int(row[3])
                trial_id = int(row[4])

                if user_id not in data: # Create structure
                    data[user_id] = {"timeAgreementScene": -1, "timeStartScene": -1, "blocks": {}}
                if block_id != -1:
                    if block_id not in data[user_id]["blocks"]:
                        data[user_id]["blocks"][block_id] = {"trialNr": {}, "timeFeedbackScene": -1}
                    if block_id - 1 not in data[user_id]["blocks"]:
                        data[user_id]["blocks"][block_id-1] = {"trialNr": {}, "timeFeedbackScene": -1}
                if trial_id != -1:
                    if trial_id not in data[user_id]["blocks"][block_id]["trialNr"]:
                        data[user_id]["blocks"][block_id]["trialNr"][trial_id] = {"timeStableUntilFeeding": -1}

                # Process event
                if event_id == 0: # timeAgreementScene
                    data[user_id]["timeAgreementScene"] = time_elapsed
                elif event_id == 1:
                    pass
                elif event_id == 2:  # timeStartScene
                    data[user_id]["timeStartScene"] = time_elapsed
                elif event_id == 3:  # timeStableUntilFeeding
                    data[user_id]["blocks"][block_id]["trialNr"][trial_id]["timeStableUntilFeeding"] = time_elapsed
                elif event_id == 4:  # timeStableClickFeedbackScene
                    pass
                elif event_id == 5:  # timeFeedbackScene
                    data[user_id]["blocks"][block_id-1]["timeFeedbackScene"] = time_elapsed
                elif event_id == 6:  # timeAttentionScene
                    pass
                else:
                    print("Unknown event_id")

            # Create final data frame
            for user_id in data.keys():
                for block_id in data[user_id]["blocks"]:
                    for trial_id in data[user_id]["blocks"][block_id]["trialNr"]:
                        if data[user_id]["blocks"][block_id]["timeFeedbackScene"] == -1 or data[user_id]["blocks"][block_id]["trialNr"][trial_id]["timeStableUntilFeeding"] == -1:
                            continue

                        data_userId.append(user_id)
                        data_group.append(self.user_groups[user_id])
                        data_BlockNr.append(block_id)
                        data_TrialNr.append(trial_id)
                        data_timeAgreementScene.append(data[user_id]["timeAgreementScene"])
                        data_timeStartScene.append(data[user_id]["timeStartScene"])
                        data_timeStableUntilFeeding.append(data[user_id]["blocks"][block_id]["trialNr"][trial_id]["timeStableUntilFeeding"])
                        data_timeFeedbackScene.append(data[user_id]["blocks"][block_id]["timeFeedbackScene"])

            df = pd.DataFrame({"userId": data_userId, "group": data_group, "BlockNr": data_BlockNr, "TrialNr": data_TrialNr, "timeAgreementScene": data_timeAgreementScene, "timeStartScene": data_timeStartScene, "timeStableUntilFeeding": data_timeStableUntilFeeding, "timeFeedbackScene": data_timeFeedbackScene})
            df.to_csv(file_out, index=False)

            return True
        except Exception as ex:
            print(ex)
            return False

    def export_survey(self, file_out_survey="survey.csv", file_out_demographics="demographics.csv"):
        try:
            # Survey
            data_userId = []
            data_group = []
            data_itemNo = []
            data_reponseNo = []
            data_checked = []

            cur = self.db.cursor()
            cur.execute("SELECT userId, questionId, var1, var2, var3, var4, var5, var6 FROM questionnaire_logs")
            for row in cur.fetchall():
                for i in range(2, 8):
                    data_userId.append(str(row[0]))
                    data_group.append(self.user_groups[str(row[0])])
                    data_itemNo.append(int(row[1]))

                    data_reponseNo.append(i - 1)
                    data_checked.append(int(row[i]))

            df = pd.DataFrame({"userId": data_userId, "group": data_group, "itemNo": data_itemNo, "responseNo": data_reponseNo, "checked": data_checked})        
            df.to_csv(file_out_survey, index=False)

            # Demographics
            data_demographics_userId = []
            data_demographics_group = []
            data_demographics_item = []
            data_demographics_responseNo = []
            data_demographics_checked = []

            cur = self.db.cursor()
            cur.execute("SELECT userId, varAge1, varAge2, varAge3, varAge4, varAge5, varAge6, varAge7, varGender1, varGender2, varGender3, varGender4, varGender5, varGender6, varGender7 FROM demographics")
            for row in cur.fetchall():
                for i in range(1, 8):
                    data_demographics_userId.append(str(row[0]))
                    data_demographics_group.append(self.user_groups[str(row[0])])
                    data_demographics_item.append("age")

                    data_demographics_responseNo.append(i)
                    data_demographics_checked.append(int(row[i]))
                for i in range(8, 15):
                    data_demographics_userId.append(str(row[0]))
                    data_demographics_group.append(self.user_groups[str(row[0])])
                    data_demographics_item.append("gender")

                    data_demographics_responseNo.append(i - 7)
                    data_demographics_checked.append(int(row[i]))

            df_demographics = pd.DataFrame({"userId": data_demographics_userId, "group": data_demographics_group, "item": data_demographics_item, "responseNo": data_demographics_responseNo, "checked": data_demographics_checked})
            df_demographics.to_csv(file_out_demographics, index=False)

            return True
        except Exception as ex:
            print(ex)
            return False

    def export_attentionCheck(self, file_out="attentionCheck.csv"):
        try:
            data_userId = []
            data_group = []
            data_trialNo = []
            data_userInput = []
            data_shubNo = []
        
            cur = self.db.cursor()
            cur.execute("SELECT userId, data FROM logs")
            for row in cur.fetchall():
                d = json.loads(row[1])
                if "userPrediction" in d:
                    data_userId.append(str(row[0]))
                    data_group.append(self.user_groups[str(row[0])])
                    data_trialNo.append(int(d["trialCount"]))
                    data_userInput.append(int(d["userPrediction"]))
                    data_shubNo.append(int(d["n_shubs"]))

            df = pd.DataFrame({"userId": data_userId, "group": data_group, "trialNo": data_trialNo, "userInput": data_userInput, "shubNo": data_shubNo})        
            df.to_csv(file_out, index=False)

            return True
        except Exception as ex:
            print(ex)
            return False
    
    def export_everything(self):
        return self.export_performance() and self.export_reactionTimes() and self.export_attentionCheck() and self.export_survey()

if __name__ == "__main__":
    dbmgr = DataMgr()
    print(dbmgr.export_everything())
