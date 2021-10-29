import ProgressScene from './progressScene.js';
import FeedbackScene from './feedbackScene.js';
import AttentionScene from './attentionScene.js';

class StableScene extends Phaser.Scene {

	constructor(varObj) {
		super({ key: 'stableScene' });
		this.varObj = varObj;
		this.startTime = undefined;
	}

	init() { }

	preload() {
		this.load.image('stable', 'static/stable.png');

		this.load.spritesheet('shub', 'static/shub_spritesheet.png', { frameWidth: 50, frameHeight: 47 });

		// load button images
		this.load.image('buttonUp', 'static/buttonUp.png');
		this.load.image('buttonDown', 'static/buttonDown.png');
		this.load.image('buttonFeed', 'static/buttonSubmit.png');

		//load plant images
		this.load.image('plant1', this.varObj.plants[0]);
		this.load.image('plant2', this.varObj.plants[1]);
		this.load.image('plant3', this.varObj.plants[2]);
		this.load.image('plant4', this.varObj.plants[3]);
		this.load.image('plant5', this.varObj.plants[4]);

	}

	create() {
		this.startTime = new Date().getTime();

		// increase trial count
		if (this.varObj.trialCount == 0) {
			this.varObj.trialCount++;
		} else if ( this.varObj.trialCount % this.varObj.numTrialsPerBlock == 0 && ! this.varObj.feedback_flag ) {
			this.varObj.feedback_flag=true;
		} else {
			this.varObj.trialCount++;
			this.varObj.feedback_flag=false;
		}

		// *** define variable values for a clean run ***
		let oldVar1 = this.varObj.clickCountVar1;
		let oldVar2 = this.varObj.clickCountVar2;
		let oldVar3 = this.varObj.clickCountVar3;
		let oldVar4 = this.varObj.clickCountVar4;
		let oldVar5 = this.varObj.clickCountVar5;
		this.varObj.clickCountVar1 = 0;
		this.varObj.clickCountVar2 = 0;
		this.varObj.clickCountVar3 = 0;
		this.varObj.clickCountVar4 = 0;
		this.varObj.clickCountVar5 = 0;

		// *** Upper content of window ***
		if (this.varObj.trialCount == 1) {
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.025, 'This is your first run!', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.075, 'Please make your first selection with the buttons on the right.', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.125, 'Clicking on the upward arrows increases the number of leaves per plant,\nclicking on the downward arrows decreases it.', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.2, 'Submit by hitting the button on the bottom right.', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		} else {
			let shubText = this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.025, 'Your pack now consists of ' + this.varObj.newNumber + ' Shubs. Before, it was ' + this.varObj.oldNumber + '.', { fontFamily: "Arial", fontSize: '20px', fontStyle: "bold italic", color: '#000000' });
			let feedText = this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.075, 'Last round, you have fed them:', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			// display everything:
			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.175, 'plant1').setScale(0.15);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.175, 'x ' + oldVar1, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.175, 'plant2').setScale(0.15);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.175, 'x ' + oldVar2, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.175, 'plant3').setScale(0.15);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.175, 'x ' + oldVar3, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.175, 'plant4').setScale(0.15);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.175, 'x ' + oldVar4, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.175, 'plant5').setScale(0.15);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.175, 'x ' + oldVar5, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		}

		// update old number of shubs
		this.varObj.oldNumber = this.varObj.newNumber;

		// if three trails are done, get feedback and start a new block
		//if (this.varObj.trialCount % 4 == 0) {
		if ( this.varObj.feedback_flag ) {
			//this.varObj.blockCount++;
			// instatiate and add new progress scene with current data
			var feedbackScene = undefined;
			// add button to submit new input - change scene when pressed!
			const buttonFeed = this.add.image(0, 0, 'buttonFeed').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.logTimeFeedback())
				.on('pointerdown', () => feedbackScene = new FeedbackScene(this.varObj))
				.on('pointerdown', () => this.scene.remove('feedbackScene', feedbackScene))
				.on('pointerdown', () => this.scene.add('feedbackScene', feedbackScene))
				.on('pointerdown', () => this.scene.start('feedbackScene'));

			var textFeedback = this.add.text(-90, -20, 'Get feedback!', { fontSize: '25px', color: '#ffffff' })
			buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonFeed, textFeedback])

		} else {

			// add counters for plant
			this.clickCountTextVar1 = this.add.text(window.innerWidth * 0.725, window.innerHeight * 0.19, '0', { fontFamily: "Arial", fontSize: '30px', color: '#000000' });
			// add counters for plant2
			this.clickCountTextVar2 = this.add.text(window.innerWidth * 0.8, window.innerHeight * 0.19, '0', { fontFamily: "Arial", fontSize: '30px', color: '#000000' });
			// add counters for plant3
			this.clickCountTextVar3 = this.add.text(window.innerWidth * 0.875, window.innerHeight * 0.19, '0', { fontFamily: "Arial", fontSize: '30px', color: '#000000' });
			// add counters for plant4
			this.clickCountTextVar4 = this.add.text(window.innerWidth * 0.7625, window.innerHeight * 0.54, '0', { fontFamily: "Arial", fontSize: '30px', color: '#000000' });
			// add counters for plant5
			this.clickCountTextVar5 = this.add.text(window.innerWidth * 0.8375, window.innerHeight * 0.54, '0', { fontFamily: "Arial", fontSize: '30px', color: '#000000' });

			//PLANT 1:
			this.add.image(window.innerWidth * 0.725, window.innerHeight * 0.05, 'plant1').setScale(0.20);
			// button up, plant 1
			const buttonUpVar1 = this.add.image(window.innerWidth * 0.725, window.innerHeight * 0.15, 'buttonUp').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar1.setText(`${Math.min(++this.varObj.clickCountVar1, this.varObj.maxFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar1 = Math.min(this.varObj.clickCountVar1, this.varObj.maxFeedingNo));
			//.on('pointerdown', () => this.this.varObj.clickCountVar1 = Math.min(this.varObj.clickCountVar1, this.varObj.maxFeedingNo));

			// button down, plant 1
			const buttonDownVar1 = this.add.image(window.innerWidth * 0.725, window.innerHeight * 0.27, 'buttonDown').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar1.setText(`${Math.max(--this.varObj.clickCountVar1, this.varObj.minFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar1 = Math.max(this.varObj.clickCountVar1, this.varObj.minFeedingNo));

			//PLANT 2:
			this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.05, 'plant2').setScale(0.2);
			// button up, plant 2
			const buttonUpVar2 = this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.15, 'buttonUp').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar2.setText(`${Math.min(++this.varObj.clickCountVar2, this.varObj.maxFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar2 = Math.min(this.varObj.clickCountVar2, this.varObj.maxFeedingNo));

			// button down, plant 2
			const buttonDownVar2 = this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.27, 'buttonDown').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar2.setText(`${Math.max(--this.varObj.clickCountVar2, this.varObj.minFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar2 = Math.max(this.varObj.clickCountVar2, this.varObj.minFeedingNo));

			// PLANT 3:
			this.add.image(window.innerWidth * 0.875, window.innerHeight * 0.05, 'plant3').setScale(0.2);
			// button up, plant 3
			const buttonUpVar3 = this.add.image(window.innerWidth * 0.875, window.innerHeight * 0.15, 'buttonUp').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar3.setText(`${Math.min(++this.varObj.clickCountVar3, this.varObj.maxFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar3 = Math.min(this.varObj.clickCountVar3, this.varObj.maxFeedingNo));

			// button down, plant 3
			const buttonDownVar3 = this.add.image(window.innerWidth * 0.875, window.innerHeight * 0.27, 'buttonDown').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar3.setText(`${Math.max(--this.varObj.clickCountVar3, this.varObj.minFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar3 = Math.max(this.varObj.clickCountVar3, this.varObj.minFeedingNo));

			// PLANT 4:
			this.add.image(window.innerWidth * 0.7625, window.innerHeight * 0.4, 'plant4').setScale(0.2);
			// button up, plant 4
			const buttonUpVar4 = this.add.image(window.innerWidth * 0.7625, window.innerHeight * 0.5, 'buttonUp').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar4.setText(`${Math.min(++this.varObj.clickCountVar4, this.varObj.maxFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar4 = Math.min(this.varObj.clickCountVar4, this.varObj.maxFeedingNo));

			// button down, plant 4
			const buttonDownVar4 = this.add.image(window.innerWidth * 0.7625, window.innerHeight * 0.62, 'buttonDown').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar4.setText(`${Math.max(--this.varObj.clickCountVar4, this.varObj.minFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar4 = Math.max(this.varObj.clickCountVar4, this.varObj.minFeedingNo));

			// PLANT 5:
			this.add.image(window.innerWidth * 0.8375, window.innerHeight * 0.4, 'plant5').setScale(0.2);
			// button up, plant 5
			const buttonUpVar5 = this.add.image(window.innerWidth * 0.8375, window.innerHeight * 0.5, 'buttonUp').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar5.setText(`${Math.min(++this.varObj.clickCountVar5, this.varObj.maxFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar5 = Math.min(this.varObj.clickCountVar5, this.varObj.maxFeedingNo));

			// button down, plant 5
			const buttonDownVar5 = this.add.image(window.innerWidth * 0.8375, window.innerHeight * 0.62, 'buttonDown').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => this.clickCountTextVar5.setText(`${Math.max(--this.varObj.clickCountVar5, this.varObj.minFeedingNo)}`))
				.on('pointerdown', () => this.varObj.clickCountVar5 = Math.max(this.varObj.clickCountVar5, this.varObj.minFeedingNo));

      // enter attention scene after pre-defined trials (see gameUI)
			if ( this.varObj.attentionTrials.includes(this.varObj.trialCount) ) {

				// instatiate and add new progress scene with current data
				var attentionScene = undefined;
				// add button to submit new input - change scene when pressed!
				const buttonFeed = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
					.setInteractive()
					.on('pointerdown', () => this.logTimeFeed())
					.on('pointerdown', () => attentionScene = new AttentionScene(this.varObj))
					.on('pointerdown', () => this.scene.remove('attentionScene', attentionScene))
					.on('pointerdown', () => this.scene.add('attentionScene', attentionScene))
					.on('pointerdown', () => this.scene.start('attentionScene'));

				var textFeed = this.add.text(-70, -15, 'Feeding time!', { fontSize: '20px', color: '#ffffff' }).setOrigin(0);
				var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.75, [buttonFeed, textFeed]);

			} else {

				// instatiate and add new progress scene with current data
				var progressScene = undefined;
				// add button to submit new input - change scene when pressed!
				const buttonFeed = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
					.setInteractive()
					.on('pointerdown', () => this.logTimeFeed())
					.on('pointerdown', () => progressScene = new ProgressScene(this.varObj))
					.on('pointerdown', () => this.scene.remove('progressScene', progressScene))
					.on('pointerdown', () => this.scene.add('progressScene', progressScene))
					.on('pointerdown', () => this.scene.start('progressScene'));

				var textFeed = this.add.text(-70, -15, 'Feeding time!', { fontSize: '20px', color: '#ffffff' }).setOrigin(0);
				var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.75, [buttonFeed, textFeed]);

		  }

		}

		// *** Display stable and Shubs
		let stable = this.textures.get('stable').getSourceImage();
		this.add.image(window.innerWidth * 0.025, window.innerHeight - (stable.height * 0.75), 'stable').setOrigin(0).setScale(0.5);

		// define animated shubs (aka "sprites" in phaser terms)
		var shubs = {
			key: 'move',
			frames: this.anims.generateFrameNumbers('shub', { start: 0, end: 9, first: Phaser.Math.Between(0, 9) }),
			frameRate: 10,
			repeat: -1,
			repeatDelay: 10
		};

		// create animation
		this.anims.create(shubs);

		// distribute shubs on screen
		for (var i = 0; i < this.varObj.newNumber; i++) {
			var tmp = Phaser.Math.Between(0, 9)
			if (tmp < 5) {
				var x = Phaser.Math.Between(window.innerWidth * 0.04, stable.width * 0.475);//1160); //10, 1130
				var y = Phaser.Math.Between(window.innerHeight - (stable.height * 0.575), window.innerHeight - (stable.height * 0.43)); //300, 525
			} else {
				var x = Phaser.Math.Between(window.innerWidth * 0.04, stable.width * 0.45);//1110); //10, 1130
				var y = Phaser.Math.Between(window.innerHeight - stable.height * 0.425, window.innerHeight - (stable.height * 0.28)); //526, 750
			}
			var startPos = Phaser.Math.Between(0, 9);
			var thisShub = this.add.sprite(x, y, 'shub', startPos);
			//set the width of the sprite
			thisShub.displayWidth = 45;
			//scale evenly
			thisShub.scaleY = thisShub.scaleX;
			// animate current individual
			thisShub.anims.delayedPlay(Phaser.Math.Between(0, 100), 'move', startPos);
			if (Phaser.Math.Between(0, 1) == 1) {
				// some move backward for variation
				thisShub.anims.reverse();
			}
		}
	}

	logTimeFeed() {
		var time = new Date().getTime() - this.startTime;
		this.varObj.api.logTime(3, time, this.varObj.blockCount, this.varObj.trialCount);
	}

	logTimeFeedback() {
		var time = new Date().getTime() - this.startTime;
		this.varObj.api.logTime(4, time, this.varObj.blockCount, this.varObj.trialCount);
	}

	update() { }

}

export default StableScene;
