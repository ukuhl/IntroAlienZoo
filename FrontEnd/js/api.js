"use strict";

class AlienZooApi {
    userId = undefined;
    controlGroup = undefined;

    log_questionnaire(questionId, checkboxVar1, checkboxVar2, checkboxVar3, checkboxVar4, checkboxVar5, checkboxVar6) {
        const data = {
            "userId": this.userId,
            "questionId": questionId,
            "checkboxValues": [checkboxVar1, checkboxVar2, checkboxVar3, checkboxVar4, checkboxVar5, checkboxVar6]
        };

        return new Promise(resolve => {
            fetch("/api/log/questionnaireAnswer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                console.error(error);

                resolve(false);
            });
        });
    }

    log_time(eventId, timeElapsed) {
        const data = {
            "userId": this.userId,
            "eventId": eventId,
            "timeElapsed": timeElapsed
        };

        return new Promise(resolve => {
            fetch("/api/log/elapsedTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                console.error(error);

                resolve(false);
            });
        });
    }

    gameStart() {
        return new Promise(resolve => {
            fetch("/api/gameStart", {
                method: "POST"
            }).then(r => r.json())
            .then(jsonData => {
                this.userId = jsonData.userId;
                this.controlGroup = jsonData.controlGroup;
                resolve(true);
            })
            .catch((error) => {
                console.error(error);

                resolve(false);
            });
        });
    }

    computeNewShubNo(numShubs, trialCount, blockCount, clickCountVar1, clickCountVar2, clickCountVar3, clickCountVar4, clickCountVar5) {
        return new Promise(resolve => {
            const data = {
                        "userId": this.userId,
                        "numShubs": numShubs,
                        "trialCount": trialCount,
                        "blockCount": blockCount,
                        "inputVars": {
                            "var1": clickCountVar1,
                            "var2": clickCountVar2,
                            "var3": clickCountVar3,
                            "var4": clickCountVar4,
                            "var5": clickCountVar5
                        }
            };

            fetch("/api/predictNewShubNo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(r => r.json())
            .then(jsonData => {
                /*if(this.controlGroup == true) {
                    resolve({
                        "newNumShubs": jsonData.newNumShubs
                    });
                }
                else {*/
                resolve({
                    "newNumShubs": jsonData.newNumShubs,
                    "counterfactualCountVars": jsonData.counterfactualCountVars,
                    "diffCountVars": jsonData.diffCountVars
                });
                //}
            })
            .catch((error) => {
                console.error(error);

                resolve(undefined);
            });
        });
    }

};
