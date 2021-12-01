import QuestionnaireScene4 from './questionnaireScene4.js';

class QuestionnaireScene3 extends Phaser.Scene {

	constructor(varObj) {
		super({ key: 'questionnaireScene3' });
		this.varObj = varObj;

		this.item6Var1Checked = false;
		this.item6Var2Checked = false;
		this.item6Var3Checked = false;
		this.item6Var4Checked = false;
		this.item6Var5Checked = false;
		this.item6Var6Checked = false;

		this.item7Var1Checked = false;
		this.item7Var2Checked = false;
		this.item7Var3Checked = false;
		this.item7Var4Checked = false;
		this.item7Var5Checked = false;
		this.item7Var6Checked = false;

		this.item8Var1Checked = false;
		this.item8Var2Checked = false;
		this.item8Var3Checked = false;
		this.item8Var4Checked = false;
		this.item8Var5Checked = false;
		this.item8Var6Checked = false;
	}

	init() { }

	preload() {
		// load button images
		this.load.spritesheet('checkbox', 'static/CheckBoxSprites.png', { frameWidth: 51, frameHeight: 50 });
	}

	create() {
		// clean slate:
		this.children.removeAll();

		var qIntro1 = [
			'To complete the study, please answer the following 10 questions.',
		]

		var qIntro2 = [
			'These questions are designed to assess your personal impressions from the game. Therefore, there are no wrong answers.',
			'',
			'Please answer as truthfully and accurately as possible.',
		]

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, qIntro1, { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.1, qIntro2, { fontFamily: 'Arial', fontSize: '17px',fontStyle: "bold italic", color: '#000000' });

		var item6 = [
			"6. I was able to use the feedback on what choice would have led to a better result to increase the number of Shubs."
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.25, item6, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.3, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite1.on('pointerdown', function (pointer) {
			if (this.item6Var1Checked) {
				item6Sprite1.setFrame(0);
				this.item6Var1Checked = false;
			} else {
				item6Sprite1.setFrame(1);
				this.item6Var1Checked = true;

				this.item6Var2Checked = false;
				this.item6Var3Checked = false;
				this.item6Var4Checked = false;
				this.item6Var5Checked = false;
				this.item6Var6Checked = false;
				item6Sprite2.setFrame(0);
				item6Sprite3.setFrame(0);
				item6Sprite4.setFrame(0);
				item6Sprite5.setFrame(0);
				item6Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.3, 'Disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite2.on('pointerdown', function (pointer) {
			if (this.item6Var2Checked) {
				item6Sprite2.setFrame(0);
				this.item6Var2Checked = false;
			} else {
				item6Sprite2.setFrame(1);
				this.item6Var2Checked = true;

				this.item6Var1Checked = false;
				this.item6Var3Checked = false;
				this.item6Var4Checked = false;
				this.item6Var5Checked = false;
				this.item6Var6Checked = false;
				item6Sprite1.setFrame(0);
				item6Sprite3.setFrame(0);
				item6Sprite4.setFrame(0);
				item6Sprite5.setFrame(0);
				item6Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.3, 'Neutral', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite3.on('pointerdown', function (pointer) {
			if (this.item6Var3Checked) {
				item6Sprite3.setFrame(0);
				this.item6Var3Checked = false;
			} else {
				item6Sprite3.setFrame(1);
				this.item6Var3Checked = true;

				this.item6Var1Checked = false;
				this.item6Var2Checked = false;
				this.item6Var4Checked = false;
				this.item6Var5Checked = false;
				this.item6Var6Checked = false;
				item6Sprite1.setFrame(0);
				item6Sprite2.setFrame(0);
				item6Sprite4.setFrame(0);
				item6Sprite5.setFrame(0);
				item6Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.3, 'Agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite4.on('pointerdown', function (pointer) {
			if (this.item6Var4Checked) {
				item6Sprite4.setFrame(0);
				this.item6Var4Checked = false;
			} else {
				item6Sprite4.setFrame(1);
				this.item6Var4Checked = true;

				this.item6Var1Checked = false;
				this.item6Var2Checked = false;
				this.item6Var3Checked = false;
				this.item6Var5Checked = false;
				this.item6Var6Checked = false;
				item6Sprite1.setFrame(0);
				item6Sprite2.setFrame(0);
				item6Sprite3.setFrame(0);
				item6Sprite5.setFrame(0);
				item6Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.3, 'Strongly agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite5.on('pointerdown', function (pointer) {
			if (this.item6Var5Checked) {
				item6Sprite5.setFrame(0);
				this.item6Var5Checked = false;
			} else {
				item6Sprite5.setFrame(1);
				this.item6Var5Checked = true;

				this.item6Var1Checked = false;
				this.item6Var2Checked = false;
				this.item6Var3Checked = false;
				this.item6Var4Checked = false;
				this.item6Var6Checked = false;
				item6Sprite1.setFrame(0);
				item6Sprite2.setFrame(0);
				item6Sprite3.setFrame(0);
				item6Sprite4.setFrame(0);
				item6Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.3, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item6Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item6Sprite6.on('pointerdown', function (pointer) {
			if (this.item6Var6Checked) {
				item6Sprite6.setFrame(0);
				this.item6Var6Checked = false;
			} else {
				item6Sprite6.setFrame(1);
				this.item6Var6Checked = true;

				this.item6Var1Checked = false;
				this.item6Var2Checked = false;
				this.item6Var3Checked = false;
				this.item6Var4Checked = false;
				this.item6Var5Checked = false;
				item6Sprite1.setFrame(0);
				item6Sprite2.setFrame(0);
				item6Sprite3.setFrame(0);
				item6Sprite4.setFrame(0);
				item6Sprite5.setFrame(0);

			}
		}.bind(this));

		var item7 = [
			"7. Are you still paying attention? If so, please select 'I prefer not to answer' for this question."
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.425, item7, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.475, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite1.on('pointerdown', function (pointer) {
			if (this.item7Var1Checked) {
				item7Sprite1.setFrame(0);
				this.item7Var1Checked = false;
			} else {
				item7Sprite1.setFrame(1);
				this.item7Var1Checked = true;

				this.item7Var2Checked = false;
				this.item7Var3Checked = false;
				this.item7Var4Checked = false;
				this.item7Var5Checked = false;
				this.item7Var6Checked = false;
				item7Sprite2.setFrame(0);
				item7Sprite3.setFrame(0);
				item7Sprite4.setFrame(0);
				item7Sprite5.setFrame(0);
				item7Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.475, 'Disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite2.on('pointerdown', function (pointer) {
			if (this.item7Var2Checked) {
				item7Sprite2.setFrame(0);
				this.item7Var2Checked = false;
			} else {
				item7Sprite2.setFrame(1);
				this.item7Var2Checked = true;

				this.item7Var1Checked = false;
				this.item7Var3Checked = false;
				this.item7Var4Checked = false;
				this.item7Var5Checked = false;
				this.item7Var6Checked = false;
				item7Sprite1.setFrame(0);
				item7Sprite3.setFrame(0);
				item7Sprite4.setFrame(0);
				item7Sprite5.setFrame(0);
				item7Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.475, 'Neutral', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite3.on('pointerdown', function (pointer) {
			if (this.item7Var3Checked) {
				item7Sprite3.setFrame(0);
				this.item7Var3Checked = false;
			} else {
				item7Sprite3.setFrame(1);
				this.item7Var3Checked = true;

				this.item7Var1Checked = false;
				this.item7Var2Checked = false;
				this.item7Var4Checked = false;
				this.item7Var5Checked = false;
				this.item7Var6Checked = false;
				item7Sprite1.setFrame(0);
				item7Sprite2.setFrame(0);
				item7Sprite4.setFrame(0);
				item7Sprite5.setFrame(0);
				item7Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.475, 'Agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite4.on('pointerdown', function (pointer) {
			if (this.item7Var4Checked) {
				item7Sprite4.setFrame(0);
				this.item7Var4Checked = false;
			} else {
				item7Sprite4.setFrame(1);
				this.item7Var4Checked = true;

				this.item7Var1Checked = false;
				this.item7Var2Checked = false;
				this.item7Var3Checked = false;
				this.item7Var5Checked = false;
				this.item7Var6Checked = false;
				item7Sprite1.setFrame(0);
				item7Sprite2.setFrame(0);
				item7Sprite3.setFrame(0);
				item7Sprite5.setFrame(0);
				item7Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.475, 'Strongly agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite5.on('pointerdown', function (pointer) {
			if (this.item7Var5Checked) {
				item7Sprite5.setFrame(0);
				this.item7Var5Checked = false;
			} else {
				item7Sprite5.setFrame(1);
				this.item7Var5Checked = true;

				this.item7Var1Checked = false;
				this.item7Var2Checked = false;
				this.item7Var3Checked = false;
				this.item7Var4Checked = false;
				this.item7Var6Checked = false;
				item7Sprite1.setFrame(0);
				item7Sprite2.setFrame(0);
				item7Sprite3.setFrame(0);
				item7Sprite4.setFrame(0);
				item7Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.475, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item7Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item7Sprite6.on('pointerdown', function (pointer) {
			if (this.item7Var6Checked) {
				item7Sprite6.setFrame(0);
				this.item7Var6Checked = false;
			} else {
				item7Sprite6.setFrame(1);
				this.item7Var6Checked = true;

				this.item7Var1Checked = false;
				this.item7Var2Checked = false;
				this.item7Var3Checked = false;
				this.item7Var4Checked = false;
				this.item7Var5Checked = false;
				item7Sprite1.setFrame(0);
				item7Sprite2.setFrame(0);
				item7Sprite3.setFrame(0);
				item7Sprite4.setFrame(0);
				item7Sprite5.setFrame(0);

			}
		}.bind(this));

		var item8 = [
			"8. I found inconsistencies in the feedback on what choice would have led to a better result."
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.6, item8, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.65, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite1.on('pointerdown', function (pointer) {
			if (this.item8Var1Checked) {
				item8Sprite1.setFrame(0);
				this.item8Var1Checked = false;
			} else {
				item8Sprite1.setFrame(1);
				this.item8Var1Checked = true;

				this.item8Var2Checked = false;
				this.item8Var3Checked = false;
				this.item8Var4Checked = false;
				this.item8Var5Checked = false;
				this.item8Var6Checked = false;
				item8Sprite2.setFrame(0);
				item8Sprite3.setFrame(0);
				item8Sprite4.setFrame(0);
				item8Sprite5.setFrame(0);
				item8Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.65, 'Disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite2.on('pointerdown', function (pointer) {
			if (this.item8Var2Checked) {
				item8Sprite2.setFrame(0);
				this.item8Var2Checked = false;
			} else {
				item8Sprite2.setFrame(1);
				this.item8Var2Checked = true;

				this.item8Var1Checked = false;
				this.item8Var3Checked = false;
				this.item8Var4Checked = false;
				this.item8Var5Checked = false;
				this.item8Var6Checked = false;
				item8Sprite1.setFrame(0);
				item8Sprite3.setFrame(0);
				item8Sprite4.setFrame(0);
				item8Sprite5.setFrame(0);
				item8Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.65, 'Neutral', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite3.on('pointerdown', function (pointer) {
			if (this.item8Var3Checked) {
				item8Sprite3.setFrame(0);
				this.item8Var3Checked = false;
			} else {
				item8Sprite3.setFrame(1);
				this.item8Var3Checked = true;

				this.item8Var1Checked = false;
				this.item8Var2Checked = false;
				this.item8Var4Checked = false;
				this.item8Var5Checked = false;
				this.item8Var6Checked = false;
				item8Sprite1.setFrame(0);
				item8Sprite2.setFrame(0);
				item8Sprite4.setFrame(0);
				item8Sprite5.setFrame(0);
				item8Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.65, 'Agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite4.on('pointerdown', function (pointer) {
			if (this.item8Var4Checked) {
				item8Sprite4.setFrame(0);
				this.item8Var4Checked = false;
			} else {
				item8Sprite4.setFrame(1);
				this.item8Var4Checked = true;

				this.item8Var1Checked = false;
				this.item8Var2Checked = false;
				this.item8Var3Checked = false;
				this.item8Var5Checked = false;
				this.item8Var6Checked = false;
				item8Sprite1.setFrame(0);
				item8Sprite2.setFrame(0);
				item8Sprite3.setFrame(0);
				item8Sprite5.setFrame(0);
				item8Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.65, 'Strongly agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite5.on('pointerdown', function (pointer) {
			if (this.item8Var5Checked) {
				item8Sprite5.setFrame(0);
				this.item8Var5Checked = false;
			} else {
				item8Sprite5.setFrame(1);
				this.item8Var5Checked = true;

				this.item8Var1Checked = false;
				this.item8Var2Checked = false;
				this.item8Var3Checked = false;
				this.item8Var4Checked = false;
				this.item8Var6Checked = false;
				item8Sprite1.setFrame(0);
				item8Sprite2.setFrame(0);
				item8Sprite3.setFrame(0);
				item8Sprite4.setFrame(0);
				item8Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.65, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item8Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.725, 'checkbox', 0).setScale(0.4).setInteractive();

		item8Sprite6.on('pointerdown', function (pointer) {
			if (this.item8Var6Checked) {
				item8Sprite6.setFrame(0);
				this.item8Var6Checked = false;
			} else {
				item8Sprite6.setFrame(1);
				this.item8Var6Checked = true;

				this.item8Var1Checked = false;
				this.item8Var2Checked = false;
				this.item8Var3Checked = false;
				this.item8Var4Checked = false;
				this.item8Var5Checked = false;
				item8Sprite1.setFrame(0);
				item8Sprite2.setFrame(0);
				item8Sprite3.setFrame(0);
				item8Sprite4.setFrame(0);
				item8Sprite5.setFrame(0);

			}
		}.bind(this));

		// instatiate and add new end scene with current data
		var questionnaireScene4 = undefined;

		// add button to request feedback
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => this.onBtnContinue());

		var textContinue = this.add.text(-50, -15, 'Continue!', { fontSize: '18px', color: '#ffffff' })
		var buttonContainer = this.add.container(window.innerWidth * 0.85, window.innerHeight * 0.80, [buttonContinue, textContinue])

	}

	logAnswers() {
		this.varObj.api.logQuestionnaire(5, this.item6Var1Checked, this.item6Var2Checked, this.item6Var3Checked, this.item6Var4Checked, this.item6Var5Checked, this.item6Var6Checked);
		this.varObj.api.logQuestionnaire(6, this.item7Var1Checked, this.item7Var2Checked, this.item7Var3Checked, this.item7Var4Checked, this.item7Var5Checked, this.item7Var6Checked);
		this.varObj.api.logQuestionnaire(7, this.item8Var1Checked, this.item8Var2Checked, this.item8Var3Checked, this.item8Var4Checked, this.item8Var5Checked, this.item8Var6Checked);
	}

	onBtnContinue() {
		if ([this.item6Var1Checked, this.item6Var2Checked, this.item6Var3Checked, this.item6Var4Checked, this.item6Var5Checked, this.item6Var6Checked].every(a => a == false) ||
			[this.item7Var1Checked, this.item7Var2Checked, this.item7Var3Checked, this.item7Var4Checked, this.item7Var5Checked, this.item7Var6Checked].every(a => a == false) ||
			[this.item8Var1Checked, this.item8Var2Checked, this.item8Var3Checked, this.item8Var4Checked, this.item8Var5Checked, this.item8Var6Checked].every(a => a == false)) {
			// alerts cause issues in fullscreen mode, here's a workaround:

			// background
			var warnDialogBG = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0xFFFFFF, 0.5).setOrigin(0);
			// dialog
			var warnDialog = this.add.rectangle((window.innerWidth * 0.5)-200, (window.innerHeight * 0.5)-130, 400, 200, 0xFFFFFF, 1).setOrigin(0);
			warnDialog.setStrokeStyle(1, 0x1000000, 1);
			var warnDialogTxt = this.add.text((window.innerWidth * 0.5)-150, (window.innerHeight * 0.5)-80, "Please answer all questions!", { fontFamily: "Arial", fontSize: '25px', color: '#000000' }).setOrigin(0);
			// text
			var buttonOK = this.add.rectangle((window.innerWidth * 0.5)-50, (window.innerHeight * 0.5)-25, 100, 50, 0x1a65ac, 1).setOrigin(0);
			buttonOK.setStrokeStyle(1, 0x1000000, 1);
			var buttontextOK = this.add.text((window.innerWidth * 0.5)-20, (window.innerHeight * 0.5)-12.5, 'Ok', { fontFamily: "Arial", fontSize: '25px', color: '#FFFFFF' }).setOrigin(0);

			// make interactive and remove all after clicking ok
			buttonOK
				.setInteractive()
				.on('pointerdown', () => { warnDialogBG.destroy(); })
				.on('pointerdown', () => { warnDialog.destroy(); })
				.on('pointerdown', () => { warnDialogTxt.destroy(); })
				.on('pointerdown', () => { buttonOK.destroy(); })
				.on('pointerdown', () => { buttontextOK.destroy(); });

		}
		else {
			this.logAnswers();

			var questionnaireScene4 = new QuestionnaireScene4(this.varObj);
			this.scene.remove('questionnaireScene4', questionnaireScene4);
			this.scene.add('questionnaireScene4', questionnaireScene4);
			this.scene.start('questionnaireScene4');
		}
	}

	update() { }

}

export default QuestionnaireScene3;
