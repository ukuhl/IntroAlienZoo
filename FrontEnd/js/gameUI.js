"use strict";

import InfoScene from './infoScene.js';

// generate new Api instance
var api = new AlienZooApi();
var game = undefined;

// start new game, log
api.gameStart().then( async (success) => {
    if(success == false) {
        throw "Error while starting the game"
    }
    // log info returned from server after api.gameStart()
    console.log(api.userId);
    console.log(api.controlGroup);

    // set configuration for phaser game
    var config = {
      type: Phaser.AUTO,
          scale: {
            mode: Phaser.Scale.FIT,
            parent: "AlienZooGame",
            autoCenter: Phaser.Scale.CENTER_BOTH
          },
          backgroundColor: '#ffffff',
          width: window.innerWidth, //* window.devicePixelRatio
          height: window.innerHeight, //* window.devicePixelRatio
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { y: 300 },
              debug: false
            }
          }
        };

    // configure phaser game
    var game = new Phaser.Game(config);

    // *** set global variables ***
    // button container
    var buttonContainer;
    // variable for current scene
    var currScene;
    // plant counters
    let clickCountVar1 = 0;
    let clickCountVar2 = 0;
    let clickCountVar3 = 0;
    let clickCountVar4 = 0;
    let clickCountVar5 = 0;
    // plant counterfactual counters
    var cf_clickCountVar1;
    var cf_clickCountVar2;
    var cf_clickCountVar3;
    var cf_clickCountVar4;
    var cf_clickCountVar5;
    // min / max numbers of leaves to be fed
    let maxFeedingNo = 6;
    let minFeedingNo = 0;
    // numbers of Shubs
    let newNumber = 5; //Math.floor(Math.random() * 100);
    let oldNumber = newNumber;
    // button to start the Game
    var buttonStart;
    var buttonContinue;
    // button to get feedback
    var buttonFeedback;
    // button to get feedback
    var buttonFeed;
    // trial and block counters
    let trialCount = 0;
    let blockCount = 1;
    // arrays for storing user input / counterfactual information for later feedback
    let in_array = [];
    let cf_array = [];
    let rand_array = [];
    let diff_array = [];
    let shubOldNo = [];
    let shubNewNo = [];
    // initialize and shuffle array of plant names
    var plants = ['static/Leaf1_test.png', 'static/Leaf2_test.png', 'static/Leaf3_test.png', 'static/Leaf4_test.png', 'static/Leaf5_test.png'];
    // randomize plant colors for this participant:
    plants = shuffle(plants);

    // generate dict containing all data, that can be easily passed through the scenes
    const varObj = {
      "api": api,
      "plants": plants,
      "trialCount": trialCount,
      "blockCount": blockCount,
      "clickCountVar1": clickCountVar1,
      "clickCountVar2": clickCountVar2,
      "clickCountVar3": clickCountVar3,
      "clickCountVar4": clickCountVar4,
      "clickCountVar5": clickCountVar5,
      "oldNumber": oldNumber,
      "newNumber": newNumber,
      "maxFeedingNo": maxFeedingNo,
      "minFeedingNo": minFeedingNo,
      "in_array" : [],
      "cf_array" : [],
      "rand_array" : [],
      "shubOldNo" : [],
      "shubNewNo" : []
    }

    // define info scene with current data, and start the scene
    var infoScene = new InfoScene(varObj);
    game.scene.add('infoScene', infoScene);
    game.scene.start('infoScene');

    // auxilliary function to shuffle the plants-array right at the start
    function shuffle(array) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    }

    //
    //
    //
    // // ***************************
    // // THIS IS THE CODE RECEIVED FROM ANDRE, HOW WE COMMUNICATE asynchronously
    // // ***************************
    // var numShubs = 4;
    // const newShubData = await api.computeNewShubNo(numShubs, trialCount, blockCount, 1, 1, 0, 0, 2);
    // if (newShubData == undefined) {
    //     throw "Error while computing new shub number"
    // }
    // console.log(newShubData);
    // // ***************************

})
.catch((error) => {
    console.log("Smth. went wrong :(");
    console.log(error);
});
