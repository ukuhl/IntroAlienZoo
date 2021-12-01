"use strict";

class AlienZooApi {
    userId = undefined;
    controlGroup = undefined;
    paymentId = undefined;

    logRandomFeedback(trialCount, blockCount, randFeedbackIndices) {
        const data = {
            "userId": this.userId,
            "trialCount": trialCount,
            "blockCount": blockCount,
            "randFeedbackIndices": randFeedbackIndices
        };

        return new Promise(resolve => {
            fetch("/api/log/randomFeedback", {
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

    logUserPerformance(trialCount, blockCount, plants, cfPlants, shubNoOld, shubNewOld) {
        const data = {
            "userId": this.userId,
            "trialCount": trialCount,
            "blockCount": blockCount,
            "plants": plants,
            "cfPlants": cfPlants,
            "shubNoOld": shubNoOld,
            "shubNoNew": shubNewOld
        };

        return new Promise(resolve => {
            fetch("/api/log/userPerformance", {
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

    logDemographics(itemAgeVar1Checked, itemAgeVar2Checked, itemAgeVar3Checked, itemAgeVar4Checked, itemAgeVar5Checked, itemAgeVar6Checked, itemAgeVar7Checked, itemGenderVar1Checked, itemGenderVar2Checked, itemGenderVar3Checked, itemGenderVar4Checked, itemGenderVar5Checked, itemGenderVar6Checked, itemGenderVar7Checked) {
        const data = {
            "userId": this.userId,
            "questionId": -1,
            "checkboxValues": [itemAgeVar1Checked, itemAgeVar2Checked, itemAgeVar3Checked, itemAgeVar4Checked, itemAgeVar5Checked, itemAgeVar6Checked, itemAgeVar7Checked,
                itemGenderVar1Checked, itemGenderVar2Checked, itemGenderVar3Checked, itemGenderVar4Checked, itemGenderVar5Checked, itemGenderVar6Checked, itemGenderVar7Checked]
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

    logQuestionnaire(questionId, checkboxVar1, checkboxVar2, checkboxVar3, checkboxVar4, checkboxVar5, checkboxVar6,) {
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

    logTime(eventId, timeElapsed, blockNo=undefined, trialNo=undefined) {
        const data = {
            "userId": this.userId,
            "eventId": eventId,
            "timeElapsed": timeElapsed,
            "blockNo": blockNo == undefined ? -1 : blockNo,
            "trialNo": trialNo == undefined ? -1 : trialNo 
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

    logAttention(userPrediction, trialCount, shubNo) {
        const data = {
            "userId": this.userId,
            "userPrediction": userPrediction,
            "trialCount": trialCount,
            "shubNo": shubNo
        };

        return new Promise(resolve => {
            fetch("/api/log/attention", {
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

    generatePaymentId() {
        var paymentIdLengt = 6; // Length of payment identifier
        var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        var paymentId = "";
        for (var i=0; i < paymentIdLengt; i++) {
            paymentId += abc.charAt(Math.floor(Math.random() * abc.length));
        }

        return paymentId;
    }

    gameStart() {
        return new Promise(resolve => {
            fetch("/api/gameStart", {
                method: "POST"
            }).then(r => r.json())
            .then(jsonData => {
                this.userId = jsonData.userId;
                this.controlGroup = jsonData.controlGroup;
                this.paymentId = this.generatePaymentId()
                resolve(true);
            })
            .catch((error) => {
                console.error(error);

                resolve(false);
            });
        });
    }

    logUserPayment() {
        const data = {
            "userId": this.userId,
            "paymentId": this.paymentId   // Will be encrypted on the server!
        };

        return new Promise(resolve => {
            fetch("/api/log/userPayment", {
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
                resolve({
                    "newNumShubs": jsonData.newNumShubs,
                    "counterfactualCountVars": jsonData.counterfactualCountVars,
                    "diffCountVars": jsonData.diffCountVars
                });
            })
            .catch((error) => {
                console.error(error);

                resolve(undefined);
            });
        });
    }

};
