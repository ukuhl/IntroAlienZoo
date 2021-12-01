import QuestionnaireScene5 from './questionnaireScene5.js';

class QuestionnaireScene4 extends Phaser.Scene {

	constructor(varObj) {
		super({ key: 'questionnaireScene4' });
		this.varObj = varObj;

		this.item9Var1Checked = false;
		this.item9Var2Checked = false;
		this.item9Var3Checked = false;
		this.item9Var4Checked = false;
		this.item9Var5Checked = false;
		this.item9Var6Checked = false;

		this.item10Var1Checked = false;
		this.item10Var2Checked = false;
		this.item10Var3Checked = false;
		this.item10Var4Checked = false;
		this.item10Var5Checked = false;
		this.item10Var6Checked = false;

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

		var item9 = [
			"9. I think most people would learn to work with the feedback on what choice would have led to a better result very quickly."
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.25, item9, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.3, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite1.on('pointerdown', function (pointer) {
			if (this.item9Var1Checked) {
				item9Sprite1.setFrame(0);
				this.item9Var1Checked = false;
			} else {
				item9Sprite1.setFrame(1);
				this.item9Var1Checked = true;

				this.item9Var2Checked = false;
				this.item9Var3Checked = false;
				this.item9Var4Checked = false;
				this.item9Var5Checked = false;
				this.item9Var6Checked = false;
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.3, 'Disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite2.on('pointerdown', function (pointer) {
			if (this.item9Var2Checked) {
				item9Sprite2.setFrame(0);
				this.item9Var2Checked = false;
			} else {
				item9Sprite2.setFrame(1);
				this.item9Var2Checked = true;

				this.item9Var1Checked = false;
				this.item9Var3Checked = false;
				this.item9Var4Checked = false;
				this.item9Var5Checked = false;
				this.item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.3, 'Neutral', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite3.on('pointerdown', function (pointer) {
			if (this.item9Var3Checked) {
				item9Sprite3.setFrame(0);
				this.item9Var3Checked = false;
			} else {
				item9Sprite3.setFrame(1);
				this.item9Var3Checked = true;

				this.item9Var1Checked = false;
				this.item9Var2Checked = false;
				this.item9Var4Checked = false;
				this.item9Var5Checked = false;
				this.item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.3, 'Agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite4.on('pointerdown', function (pointer) {
			if (this.item9Var4Checked) {
				item9Sprite4.setFrame(0);
				this.item9Var4Checked = false;
			} else {
				item9Sprite4.setFrame(1);
				this.item9Var4Checked = true;

				this.item9Var1Checked = false;
				this.item9Var2Checked = false;
				this.item9Var3Checked = false;
				this.item9Var5Checked = false;
				this.item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.3, 'Strongly agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite5.on('pointerdown', function (pointer) {
			if (this.item9Var5Checked) {
				item9Sprite5.setFrame(0);
				this.item9Var5Checked = false;
			} else {
				item9Sprite5.setFrame(1);
				this.item9Var5Checked = true;

				this.item9Var1Checked = false;
				this.item9Var2Checked = false;
				this.item9Var3Checked = false;
				this.item9Var4Checked = false;
				this.item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.3, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item9Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.35, 'checkbox', 0).setScale(0.4).setInteractive();

		item9Sprite6.on('pointerdown', function (pointer) {
			if (this.item9Var6Checked) {
				item9Sprite6.setFrame(0);
				this.item9Var6Checked = false;
			} else {
				item9Sprite6.setFrame(1);
				this.item9Var6Checked = true;

				this.item9Var1Checked = false;
				this.item9Var2Checked = false;
				this.item9Var3Checked = false;
				this.item9Var4Checked = false;
				this.item9Var5Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);

			}
		}.bind(this));

		var item10 = [
			"10. I received the feedback on what choice would have led to a better result in a timely and efficient manner."
		];

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.425, item10, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.475, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite1.on('pointerdown', function (pointer) {
			if (this.item10Var1Checked) {
				item10Sprite1.setFrame(0);
				this.item10Var1Checked = false;
			} else {
				item10Sprite1.setFrame(1);
				this.item10Var1Checked = true;

				this.item10Var2Checked = false;
				this.item10Var3Checked = false;
				this.item10Var4Checked = false;
				this.item10Var5Checked = false;
				this.item10Var6Checked = false;
				item10Sprite2.setFrame(0);
				item10Sprite3.setFrame(0);
				item10Sprite4.setFrame(0);
				item10Sprite5.setFrame(0);
				item10Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.475, 'Disagree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite2.on('pointerdown', function (pointer) {
			if (this.item10Var2Checked) {
				item10Sprite2.setFrame(0);
				this.item10Var2Checked = false;
			} else {
				item10Sprite2.setFrame(1);
				this.item10Var2Checked = true;

				this.item10Var1Checked = false;
				this.item10Var3Checked = false;
				this.item10Var4Checked = false;
				this.item10Var5Checked = false;
				this.item10Var6Checked = false;
				item10Sprite1.setFrame(0);
				item10Sprite3.setFrame(0);
				item10Sprite4.setFrame(0);
				item10Sprite5.setFrame(0);
				item10Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.475, 'Neutral', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite3.on('pointerdown', function (pointer) {
			if (this.item10Var3Checked) {
				item10Sprite3.setFrame(0);
				this.item10Var3Checked = false;
			} else {
				item10Sprite3.setFrame(1);
				this.item10Var3Checked = true;

				this.item10Var1Checked = false;
				this.item10Var2Checked = false;
				this.item10Var4Checked = false;
				this.item10Var5Checked = false;
				this.item10Var6Checked = false;
				item10Sprite1.setFrame(0);
				item10Sprite2.setFrame(0);
				item10Sprite4.setFrame(0);
				item10Sprite5.setFrame(0);
				item10Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.475, 'Agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite4.on('pointerdown', function (pointer) {
			if (this.item10Var4Checked) {
				item10Sprite4.setFrame(0);
				this.item10Var4Checked = false;
			} else {
				item10Sprite4.setFrame(1);
				this.item10Var4Checked = true;

				this.item10Var1Checked = false;
				this.item10Var2Checked = false;
				this.item10Var3Checked = false;
				this.item10Var5Checked = false;
				this.item10Var6Checked = false;
				item10Sprite1.setFrame(0);
				item10Sprite2.setFrame(0);
				item10Sprite3.setFrame(0);
				item10Sprite5.setFrame(0);
				item10Sprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.475, 'Strongly agree', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite5.on('pointerdown', function (pointer) {
			if (this.item10Var5Checked) {
				item10Sprite5.setFrame(0);
				this.item10Var5Checked = false;
			} else {
				item10Sprite5.setFrame(1);
				this.item10Var5Checked = true;

				this.item10Var1Checked = false;
				this.item10Var2Checked = false;
				this.item10Var3Checked = false;
				this.item10Var4Checked = false;
				this.item10Var6Checked = false;
				item10Sprite1.setFrame(0);
				item10Sprite2.setFrame(0);
				item10Sprite3.setFrame(0);
				item10Sprite4.setFrame(0);
				item10Sprite6.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.475, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var item10Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.55, 'checkbox', 0).setScale(0.4).setInteractive();

		item10Sprite6.on('pointerdown', function (pointer) {
			if (this.item10Var6Checked) {
				item10Sprite6.setFrame(0);
				this.item10Var6Checked = false;
			} else {
				item10Sprite6.setFrame(1);
				this.item10Var6Checked = true;

				this.item10Var1Checked = false;
				this.item10Var2Checked = false;
				this.item10Var3Checked = false;
				this.item10Var4Checked = false;
				this.item10Var5Checked = false;
				item10Sprite1.setFrame(0);
				item10Sprite2.setFrame(0);
				item10Sprite3.setFrame(0);
				item10Sprite4.setFrame(0);
				item10Sprite5.setFrame(0);

			}
		}.bind(this));

		// instatiate and add new end scene with current data
		var questionnaireScene5 = undefined;

		// add button to request feedback
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => this.onBtnContinue());

		var textContinue = this.add.text(-50, -15, 'Continue!', { fontSize: '18px', color: '#ffffff' })
		var buttonContainer = this.add.container(window.innerWidth * 0.85, window.innerHeight * 0.80, [buttonContinue, textContinue])

	}

	logAnswers() {
		this.varObj.api.logQuestionnaire(8, this.item9Var1Checked, this.item9Var2Checked, this.item9Var3Checked, this.item9Var4Checked, this.item9Var5Checked, this.item9Var6Checked);
		this.varObj.api.logQuestionnaire(9, this.item10Var1Checked, this.item10Var2Checked, this.item10Var3Checked, this.item10Var4Checked, this.item10Var5Checked, this.item10Var6Checked)
	}

	onBtnContinue() {
		if ([this.item9Var1Checked, this.item9Var2Checked, this.item9Var3Checked, this.item9Var4Checked, this.item9Var5Checked, this.item9Var6Checked].every(a => a == false) ||
		[this.item10Var1Checked, this.item10Var2Checked, this.item10Var3Checked, this.item10Var4Checked, this.item10Var5Checked, this.item10Var6Checked].every(a => a == false)) {
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

			var questionnaireScene5 = new QuestionnaireScene5(this.varObj);
			this.scene.remove('questionnaireScene5', questionnaireScene5);
			this.scene.add('questionnaireScene5', questionnaireScene5);
			this.scene.start('questionnaireScene5');
		}
	}

	update() { }

}

export default QuestionnaireScene4;
