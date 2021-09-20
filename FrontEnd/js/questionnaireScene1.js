import QuestionnaireScene2 from './questionnaireScene2.js';

class QuestionnaireScene1 extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({ key: 'questionnaireScene1' });
		this.varObj = varObj;

		this.item1Var1Checked = false;
		this.item1Var2Checked = false;
		this.item1Var3Checked = false;
		this.item1Var4Checked = false;
		this.item1Var5Checked = false;
		this.item1Var6Checked = false;

		this.item2Var1Checked = false;
		this.item2Var2Checked = false;
		this.item2Var3Checked = false;
		this.item2Var4Checked = false;
		this.item2Var5Checked = false;
		this.item2Var6Checked = false;
	}

	init() { }

	preload() {
		// load button images
		//this.load.image('checkboxEmpty', 'static/CheckBoxEmpty.png');
		//this.load.image('checkboxClicked', 'static/CheckBoxClicked.png');
		this.load.spritesheet('checkbox', 'static/CheckBoxSprites.png', { frameWidth: 51, frameHeight: 50 });
	}

	create() {
		// clean slate:
		this.children.removeAll();

		var qIntro = [
			'You have completed the Alien Zoo game!',
			'',
			'To complete the study, please answer the following 9 questions.',
			'Please answer as truthfully and accurately as possible.',
			'These questions are designed to assess your personal impressions from the game. Therefore, there are no wrong answers.',
		]

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, qIntro, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item1 = [
			"1. What do you think: Which plants were relevant to increase the number of Shubs in your pack?"
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.2, item1, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		// plant 1
		this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.275, 'plant1').setScale(0.15);

		var item1Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite1.on('pointerdown', function (pointer) {
			if (this.item1Var1Checked) {
				item1Sprite1.setFrame(0);
				this.item1Var1Checked = false;
			} else {
				item1Sprite1.setFrame(1);
				this.item1Var1Checked = true;

				this.item1Var6Checked = false;
				item1Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 2
		this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.275, 'plant2').setScale(0.15);

		var item1Sprite2 = this.add.sprite(window.innerWidth * 0.16, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite2.on('pointerdown', function (pointer) {
			if (this.item1Var2Checked) {
				item1Sprite2.setFrame(0);
				this.item1Var2Checked = false;
			} else {
				item1Sprite2.setFrame(1);
				this.item1Var2Checked = true;

				this.item1Var6Checked = false;
				item1Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 3
		this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.275, 'plant3').setScale(0.15);

		var item1Sprite3 = this.add.sprite(window.innerWidth * 0.27, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite3.on('pointerdown', function (pointer) {
			if (this.item1Var3Checked) {
				item1Sprite3.setFrame(0);
				this.item1Var3Checked = false;
			} else {
				item1Sprite3.setFrame(1);
				this.item1Var3Checked = true;

				this.item1Var6Checked = false;
				item1Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 4
		this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.275, 'plant4').setScale(0.15);

		var item1Sprite4 = this.add.sprite(window.innerWidth * 0.38, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite4.on('pointerdown', function (pointer) {
			if (this.item1Var4Checked) {
				item1Sprite4.setFrame(0);
				this.item1Var4Checked = false;
			} else {
				item1Sprite4.setFrame(1);
				this.item1Var4Checked = true;

				this.item1Var6Checked = false;
				item1Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 5
		this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.275, 'plant5').setScale(0.15);

		var item1Sprite5 = this.add.sprite(window.innerWidth * 0.49, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite5.on('pointerdown', function (pointer) {
			if (this.item1Var5Checked) {
				item1Sprite5.setFrame(0);
				this.item1Var5Checked = false;
			} else {
				item1Sprite5.setFrame(1);
				this.item1Var5Checked = true;

				this.item1Var6Checked = false;
				item1Sprite6.setFrame(0);
			}
		});

		// Don't know
		this.add.text(window.innerWidth * 0.60, window.innerHeight * 0.275, 'I do not know.', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item1Sprite6 = this.add.sprite(window.innerWidth * 0.60, window.innerHeight * 0.325, 'checkbox', 0).setScale(0.25).setInteractive();

		item1Sprite6.on('pointerdown', function (pointer) {
			if (this.item1Var6Checked) {
				item1Sprite6.setFrame(0);
				item1Var6Checked = false;
			} else {
				item1Sprite6.setFrame(1);
				this.item1Var6Checked = true;

				this.item1Var1Checked = false;
				this.item1Var2Checked = false;
				this.item1Var3Checked = false;
				this.item1Var4Checked = false;
				this.item1Var5Checked = false;
				item1Sprite1.setFrame(0);
				item1Sprite2.setFrame(0);
				item1Sprite3.setFrame(0);
				item1Sprite4.setFrame(0);
				item1Sprite5.setFrame(0);

			}
		}.bind(this));


		var item2 = [
			"2. What do you think: Which plants were not relevant to increase the number of Shubs in your pack?"
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.4, item2, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		// plant 1
		this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.475, 'plant1').setScale(0.15);

		var item2Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite1.on('pointerdown', function (pointer) {
			if (this.item2Var1Checked) {
				item2Sprite1.setFrame(0);
				this.item2Var1Checked = false;
			} else {
				item2Sprite1.setFrame(1);
				this.item2Var1Checked = true;

				this.item2Var6Checked = false;
				item2Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 2
		this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.475, 'plant2').setScale(0.15);

		var item2Sprite2 = this.add.sprite(window.innerWidth * 0.16, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite2.on('pointerdown', function (pointer) {
			if (this.item2Var2Checked) {
				item2Sprite2.setFrame(0);
				this.item2Var2Checked = false;
			} else {
				item2Sprite2.setFrame(1);
				this.item2Var2Checked = true;

				this.item2Var6Checked = false;
				item2Sprite6.setFrame(0);

			}
		});

		// plant 3
		this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.475, 'plant3').setScale(0.15);

		var item2Sprite3 = this.add.sprite(window.innerWidth * 0.27, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite3.on('pointerdown', function (pointer) {
			if (this.item2Var3Checked) {
				item2Sprite3.setFrame(0);
				this.item2Var3Checked = false;
			} else {
				item2Sprite3.setFrame(1);
				this.item2Var3Checked = true;

				this.item2Var6Checked = false;
				item2Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 4
		this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.475, 'plant4').setScale(0.15);

		var item2Sprite4 = this.add.sprite(window.innerWidth * 0.38, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite4.on('pointerdown', function (pointer) {
			if (this.item2Var4Checked) {
				item2Sprite4.setFrame(0);
				this.item2Var4Checked = false;
			} else {
				item2Sprite4.setFrame(1);
				this.item2Var4Checked = true;

				this.item2Var6Checked = false;
				item2Sprite6.setFrame(0);

			}
		}.bind(this));

		// plant 5
		this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.475, 'plant5').setScale(0.15);

		var item2Sprite5 = this.add.sprite(window.innerWidth * 0.49, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite5.on('pointerdown', function (pointer) {
			if (this.item2Var5Checked) {
				item2Sprite5.setFrame(0);
				this.item2Var5Checked = false;
			} else {
				item2Sprite5.setFrame(1);
				this.item2Var5Checked = true;

				this.item2Var6Checked = false;
				item2Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.60, window.innerHeight * 0.475, 'I do not know.', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item2Sprite6 = this.add.sprite(window.innerWidth * 0.60, window.innerHeight * 0.525, 'checkbox', 0).setScale(0.25).setInteractive();

		item2Sprite6.on('pointerdown', function (pointer) {
			if (this.item2Var6Checked) {
				item2Sprite6.setFrame(0);
				this.item2Var6Checked = false;
			} else {
				item2Sprite6.setFrame(1);
				this.item2Var6Checked = true;

				this.item2Var1Checked = false;
				this.item2Var2Checked = false;
				this.item2Var3Checked = false;
				this.item2Var4Checked = false;
				this.item2Var5Checked = false;
				item2Sprite1.setFrame(0);
				item2Sprite2.setFrame(0);
				item2Sprite3.setFrame(0);
				item2Sprite4.setFrame(0);
				item2Sprite5.setFrame(0);

			}
		}.bind(this));

		/*
		// instatiate and add new end scene with current data
		var endScene = undefined;
		// add button to change to next page
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.5)
			.setInteractive()
			.on('pointerdown', () => endScene = new EndScene(this.varObj))
			.on('pointerdown', () => this.scene.remove('endScene', endScene))
			.on('pointerdown', () => this.scene.add('endScene', endScene))
			.on('pointerdown', () => this.scene.start('endScene'));

		var textContinue = this.add.text(-95, -20, 'Continue!', { fontSize: '25px', color: '#000000' })
		var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonContinue, textContinue])
		*/

		// instatiate and add new end scene with current data
		var questionnaireScene2 = undefined;

		// add button to request feedback
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => this.onBtnContinue());

		var textContinue = this.add.text(-50, -15, 'Continue!', { fontSize: '18px', color: '#000000' })
		var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.70, [buttonContinue, textContinue])


	}

	logAnswers() {
		this.varObj.api.logQuestionnaire(0, this.item1Var1Checked, this.item1Var2Checked, this.item1Var3Checked, this.item1Var4Checked, this.item1Var5Checked, this.item1Var6Checked);
		this.varObj.api.logQuestionnaire(1, this.item2Var1Checked, this.item2Var2Checked, this.item2Var3Checked, this.item2Var4Checked, this.item2Var5Checked, this.item2Var6Checked);
	}

	onBtnContinue() {
		if ([this.item1Var1Checked, this.item1Var2Checked, this.item1Var3Checked, this.item1Var4Checked, this.item1Var5Checked, this.item1Var6Checked].every(a => a == false) ||
			[this.item2Var1Checked, this.item2Var2Checked, this.item2Var3Checked, this.item2Var4Checked, this.item2Var5Checked, this.item2Var6Checked].every(a => a == false)) {
			alert("Please answer all questions!");
		}
		else {
			this.logAnswers();

			var questionnaireScene2 = new QuestionnaireScene2(this.varObj);
			this.scene.remove('questionnaireScene2', questionnaireScene2);
			this.scene.add('questionnaireScene2', questionnaireScene2);
			this.scene.start('questionnaireScene2');
		}
	}

	update() { }

}

export default QuestionnaireScene1;
