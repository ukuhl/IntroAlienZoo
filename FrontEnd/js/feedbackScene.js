import StableScene from './stableScene.js';
import QuestionnaireScene1 from './questionnaireScene1.js';

class FeedbackScene extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({ key: 'feedbackScene' });
		this.varObj = varObj
	}

	init() { }

	preload() {
		this.load.spritesheet('shub', 'static/shub_spritesheet.png', { frameWidth: 50, frameHeight: 47 });

		// load button images
		this.load.image('buttonFeed', 'static/buttonSubmit.png');

		//load plant images
		this.load.image('plant1', this.varObj.plants[0]);
		this.load.image('plant2', this.varObj.plants[1]);
		this.load.image('plant3', this.varObj.plants[2]);
		this.load.image('plant4', this.varObj.plants[3]);
		this.load.image('plant5', this.varObj.plants[4]);

	}

	create() {

		if (this.varObj.api.controlGroup) {
			// 1st round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.025, 'In round 1, you selected:', { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.075, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.075, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.075, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.075, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.075, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.1250, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.1250, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.1250, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.1250, 'x ' + this.varObj.shubOldNo[1], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.1250, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.1250, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.1250, 'x ' + this.varObj.shubNewNo[1], { fontSize: '18px', color: '#000000' });


			if (this.varObj.cf_array[1][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.200, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.175, 'Plants other users selected this at this point in time:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.2250, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.2250, 'x ' + this.varObj.in_array[1][0], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.2250, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.2250, 'x ' + this.varObj.in_array[1][1], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.2250, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.2250, 'x ' + this.varObj.in_array[1][2], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.2250, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.2250, 'x ' + this.varObj.in_array[1][3], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.2250, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.2250, 'x ' + this.varObj.in_array[1][4], { fontSize: '18px', color: '#000000' });
			}

			// 2nd round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.300, 'In round 2, you selected:', { fontSize: '18px', color: '#000000' });

			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.35, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.35, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.35, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.35, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.35, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.400, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.400, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.400, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.400, 'x ' + this.varObj.shubOldNo[2], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.400, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.400, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.400, 'x ' + this.varObj.shubNewNo[2], { fontSize: '18px', color: '#000000' });

			if (this.varObj.cf_array[2][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.475, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.450, 'Plants other users selected this at this point in time:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.50, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.50, 'x ' + this.varObj.in_array[2][0], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.50, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.50, 'x ' + this.varObj.in_array[2][1], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.50, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.50, 'x ' + this.varObj.in_array[2][2], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.50, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.50, 'x ' + this.varObj.in_array[2][3], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.50, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.50, 'x ' + this.varObj.in_array[2][4], { fontSize: '18px', color: '#000000' });
			}

			// 3rd round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.575, 'In round 3, you selected:', { fontSize: '18px', color: '#000000' });

			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.625, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.625, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.625, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.625, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.625, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.6750, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.6750, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.6750, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.6750, 'x ' + this.varObj.shubOldNo[3], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.6750, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.6750, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.6750, 'x ' + this.varObj.shubNewNo[3], { fontSize: '18px', color: '#000000' });

			if (this.varObj.cf_array[3][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.75, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.7250, 'Plants other users selected this at this point in time:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.775, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.775, 'x ' + this.varObj.in_array[3][0], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.775, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.775, 'x ' + this.varObj.in_array[3][1], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.775, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.775, 'x ' + this.varObj.in_array[3][2], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.775, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.775, 'x ' + this.varObj.in_array[3][3], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.775, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.775, 'x ' + this.varObj.in_array[3][4], { fontSize: '18px', color: '#000000' });
			}
		} else {
			// 1st round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.025, 'In round 1, you selected:', { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.075, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.075, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.075, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.075, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.075, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.075, 'x ' + this.varObj.in_array[1][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.1250, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.1250, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.1250, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.1250, 'x ' + this.varObj.shubOldNo[1], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.1250, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.1250, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.1250, 'x ' + this.varObj.shubNewNo[1], { fontSize: '18px', color: '#000000' });


			if (this.varObj.cf_array[1][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.200, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.175, 'Your result would have been better if you had selected:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.2250, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.2250, 'x ' + this.varObj.cf_array[1][0], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.2250, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.2250, 'x ' + this.varObj.cf_array[1][1], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.2250, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.2250, 'x ' + this.varObj.cf_array[1][2], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.2250, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.2250, 'x ' + this.varObj.cf_array[1][3], { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.2250, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.2250, 'x ' + this.varObj.cf_array[1][4], { fontSize: '18px', color: '#000000' });
			}

			// 2nd round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.300, 'In round 2, you selected:', { fontSize: '18px', color: '#000000' });

			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.35, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.35, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.35, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.35, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.35, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.35, 'x ' + this.varObj.in_array[2][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.400, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.400, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.400, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.400, 'x ' + this.varObj.shubOldNo[2], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.400, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.400, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.400, 'x ' + this.varObj.shubNewNo[2], { fontSize: '18px', color: '#000000' });

			if (this.varObj.cf_array[2][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.475, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.450, 'Your result would have been better if you had selected:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.50, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.50, `x ${this.varObj.cf_array[2][0]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.50, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.50, `x ${this.varObj.cf_array[2][1]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.50, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.50, `x ${this.varObj.cf_array[2][2]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.50, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.50, `x ${this.varObj.cf_array[2][3]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.50, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.50, `x ${this.varObj.cf_array[2][4]}`, { fontSize: '18px', color: '#000000' });
			}

			// 3rd round:
			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.575, 'In round 3, you selected:', { fontSize: '18px', color: '#000000' });

			this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.625, 'plant1').setScale(0.1);
			this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][0], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.625, 'plant2').setScale(0.1);
			this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][1], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.625, 'plant3').setScale(0.1);
			this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][2], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.625, 'plant4').setScale(0.1);
			this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][3], { fontSize: '18px', color: '#000000' });
			this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.625, 'plant5').setScale(0.1);
			this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.625, 'x ' + this.varObj.in_array[3][4], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.6750, 'Result:', { fontSize: '18px', color: '#000000' });
			this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.6750, 'Before:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.225, window.innerHeight * 0.6750, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.250, window.innerHeight * 0.6750, 'x ' + this.varObj.shubOldNo[3], { fontSize: '18px', color: '#000000' });

			this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.6750, 'After:', { fontSize: '18px', color: '#000000' });
			this.add.sprite(window.innerWidth * 0.425, window.innerHeight * 0.6750, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(0.8);
			this.add.text(window.innerWidth * 0.450, window.innerHeight * 0.6750, 'x ' + this.varObj.shubNewNo[3], { fontSize: '18px', color: '#000000' });

			if (this.varObj.cf_array[3][0] == -1000) {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.75, 'Congrats! You were close to an optimal solution in this round!', { fontSize: '18px', color: '#000000' });
			} else {
				this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.7250, 'Your result would have been better if you had selected:', { fontSize: '18px', color: '#000000' });

				this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.775, 'plant1').setScale(0.1);
				this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.775, `x ${this.varObj.cf_array[3][0]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.775, 'plant2').setScale(0.1);
				this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.775, `x ${this.varObj.cf_array[3][1]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.775, 'plant3').setScale(0.1);
				this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.775, `x ${this.varObj.cf_array[3][2]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.775, 'plant4').setScale(0.1);
				this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.775, `x ${this.varObj.cf_array[3][3]}`, { fontSize: '18px', color: '#000000' });
				this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.775, 'plant5').setScale(0.1);
				this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.775, `x ${this.varObj.cf_array[3][4]}`, { fontSize: '18px', color: '#000000' });
			}
		}

		// depending on block number:
		if (this.varObj.blockCount < 6) {

			// instatiate and add new stable scene with current data
			var stableScene = undefined;

			// add button to request feedback
			var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => stableScene = new StableScene(this.varObj))
				.on('pointerdown', () => this.scene.remove('stableScene', stableScene))
				.on('pointerdown', () => this.scene.add('stableScene', stableScene))
				.on('pointerdown', () => this.scene.start('stableScene'));

			var textContinue = this.add.text(-95, -20, 'Continue!', { fontSize: '25px', color: '#000000' })
			var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonContinue, textContinue])

		} else {

			// instatiate and add new end scene with current data
			var questionnaireScene1 = undefined;

			// add button to request feedback
			var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.5)
				.setInteractive()
				.on('pointerdown', () => questionnaireScene1 = new QuestionnaireScene1(this.varObj))
				.on('pointerdown', () => this.scene.remove('questionnaireScene1', questionnaireScene1))
				.on('pointerdown', () => this.scene.add('questionnaireScene1', questionnaireScene1))
				.on('pointerdown', () => this.scene.start('questionnaireScene1'));

			var textContinue = this.add.text(-95, -20, 'Continue!', { fontSize: '25px', color: '#000000' })
			var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonContinue, textContinue])

		}

	}

	update() { }

}

export default FeedbackScene;
