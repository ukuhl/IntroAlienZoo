import EndScene from './endScene.js';

class QuestionnaireScene4 extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({ key: 'questionnaireScene4' });
		this.varObj = varObj;

		this.item9Var1Checked = false;
		this.item9Var2Checked = false;
		this.item9Var3Checked = false;
		this.item9Var4Checked = false;
		this.item9Var5Checked = false;
		this.item9Var6Checked = false;

		this.itemGenderVar1Checked = false;
		this.itemGenderVar2Checked = false;
		this.itemGenderVar3Checked = false;
		this.itemGenderVar4Checked = false;
		this.itemGenderVar5Checked = false;
		this.itemGenderVar6Checked = false;
		this.itemGenderVar7Checked = false;

		this.itemAgeVar1Checked = false;
		this.itemAgeVar2Checked = false;
		this.itemAgeVar3Checked = false;
		this.itemAgeVar4Checked = false;
		this.itemAgeVar5Checked = false;
		this.itemAgeVar6Checked = false;
		this.itemAgeVar7Checked = false;

	}

	init() { }

	preload() {
		// load button images
		//this.load.image('checkboxEmpty', 'static/CheckBoxEmpty.png');
		//this.load.image('checkboxClicked', 'static/CheckBoxClicked.png');
		this.load.spritesheet('checkbox', 'static/CheckBoxSprites.png', { frameWidth: 51, frameHeight: 50 });
	}

	create() {
		/*
		var item10Var1Checked = false;
		var item10Var2Checked = false;
		var item10Var3Checked = false;
		var item10Var4Checked = false;
		var item10Var5Checked = false;
		var item10Var6Checked = false;

		var item11Var1Checked = false;
		var item11Var2Checked = false;
		var item11Var3Checked = false;
		var item11Var4Checked = false;
		var item11Var5Checked = false;
		var item11Var6Checked = false;
		*/

		// clean slate:
		this.children.removeAll();

		var qIntro1 = [
			'To complete the study, please answer the following 9 questions.',
		]

		var qIntro2 = [
			'These questions are designed to assess your personal impressions from the game. Therefore, there are no wrong answers.',
			'',
			'Please answer as truthfully and accurately as possible.',
		]

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, qIntro1, { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.1, qIntro2, { fontFamily: 'Arial', fontSize: '17px',fontStyle: "bold italic", color: '#000000' });

		// if (this.varObj.api.controlGroup) {
		// 	var item9 = [
		// 		"9. I received the feedback based on what other users tried at that point in time in the game in a timely and efficient manner."
		// 	];
		// } else {
		var item9 = [
			"9. I received the feedback on what choice would have led to a better result in a timely and efficient manner."
		];
		// }

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



		var demographics = [
			'To finish up, we would like to collect some demographic information.',,
		]

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.425, demographics, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		var itemGender = [
			"Which term most accurately describes your gender?"
		]

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.475, itemGender, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.525, 'Female', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite1 = this.add.sprite(window.innerWidth * 0.04, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite1.on('pointerdown', function (pointer) {
			if (this.itemGenderVar1Checked) {
				itemGenderSprite1.setFrame(0);
				this.itemGenderVar1Checked = false;
			} else {
				itemGenderSprite1.setFrame(1);
				this.itemGenderVar1Checked = true;

				this.itemGenderVar2Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar6Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite2.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite6.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.150, window.innerHeight * 0.525, 'Male', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite2 = this.add.sprite(window.innerWidth * 0.16, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite2.on('pointerdown', function (pointer) {
			if (this.itemGenderVar2Checked) {
				itemGenderSprite2.setFrame(0);
				this.itemGenderVar2Checked = false;
			} else {
				itemGenderSprite2.setFrame(1);
				this.itemGenderVar2Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar6Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite6.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.265, window.innerHeight * 0.51, 'Transgender\nfemale', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite3 = this.add.sprite(window.innerWidth * 0.29, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite3.on('pointerdown', function (pointer) {
			if (this.itemGenderVar3Checked) {
				itemGenderSprite3.setFrame(0);
				this.itemGenderVar3Checked = false;
			} else {
				itemGenderSprite3.setFrame(1);
				this.itemGenderVar3Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar2Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar6Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite2.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite6.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.385, window.innerHeight * 0.51, 'Transgender\nmale', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite4 = this.add.sprite(window.innerWidth * 0.42, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite4.on('pointerdown', function (pointer) {
			if (this.itemGenderVar4Checked) {
				itemGenderSprite4.setFrame(0);
				this.itemGenderVar4Checked = false;
			} else {
				itemGenderSprite4.setFrame(1);
				this.itemGenderVar4Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar2Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar6Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite2.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite6.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.505, window.innerHeight * 0.48, 'Non-binary /\n gender non-\nconforming', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite5 = this.add.sprite(window.innerWidth * 0.54, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite5.on('pointerdown', function (pointer) {
			if (this.itemGenderVar5Checked) {
				itemGenderSprite5.setFrame(0);
				this.itemGenderVar5Checked = false;
			} else {
				itemGenderSprite5.setFrame(1);
				this.itemGenderVar5Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar2Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar6Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite2.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite6.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// option 6
		this.add.text(window.innerWidth * 0.65, window.innerHeight * 0.525, 'Not listed', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite6 = this.add.sprite(window.innerWidth * 0.67, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite6.on('pointerdown', function (pointer) {
			if (this.itemGenderVar6Checked) {
				itemGenderSprite6.setFrame(0);
				this.itemGenderVar6Checked = false;
			} else {
				itemGenderSprite6.setFrame(1);
				this.itemGenderVar6Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar2Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar7Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite2.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite7.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.525, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemGenderSprite7 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.575, 'checkbox', 0).setScale(0.4).setInteractive();

		itemGenderSprite7.on('pointerdown', function (pointer) {
			if (this.itemGenderVar7Checked) {
				itemGenderSprite7.setFrame(0);
				this.itemGenderVar7Checked = false;
			} else {
				itemGenderSprite7.setFrame(1);
				this.itemGenderVar7Checked = true;

				this.itemGenderVar1Checked = false;
				this.itemGenderVar2Checked = false;
				this.itemGenderVar3Checked = false;
				this.itemGenderVar4Checked = false;
				this.itemGenderVar5Checked = false;
				this.itemGenderVar6Checked = false;
				itemGenderSprite1.setFrame(0);
				itemGenderSprite2.setFrame(0);
				itemGenderSprite3.setFrame(0);
				itemGenderSprite4.setFrame(0);
				itemGenderSprite5.setFrame(0);
				itemGenderSprite6.setFrame(0);

			}
		}.bind(this));

		var itemAge = [
			"Plase indicate your age:"
		]

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.65, itemAge, { fontFamily: 'Arial', fontSize: '17px', fontStyle: "bold", color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.7, '18-24y', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite1 = this.add.sprite(window.innerWidth * 0.04, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite1.on('pointerdown', function (pointer) {
			if (this.itemAgeVar1Checked) {
				itemAgeSprite1.setFrame(0);
				this.itemAgeVar1Checked = false;
			} else {
				itemAgeSprite1.setFrame(1);
				this.itemAgeVar1Checked = true;

				this.itemAgeVar2Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite2.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));

		// option 2
		this.add.text(window.innerWidth * 0.125, window.innerHeight * 0.7, '25-34y', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite2 = this.add.sprite(window.innerWidth * 0.14, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite2.on('pointerdown', function (pointer) {
			if (this.itemAgeVar2Checked) {
				itemAgeSprite2.setFrame(0);
				this.itemAgeVar2Checked = false;
			} else {
				itemAgeSprite2.setFrame(1);
				this.itemAgeVar2Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));

		// option 3
		this.add.text(window.innerWidth * 0.225, window.innerHeight * 0.7, '35-44y', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite3 = this.add.sprite(window.innerWidth * 0.24, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite3.on('pointerdown', function (pointer) {
			if (this.itemAgeVar3Checked) {
				itemAgeSprite3.setFrame(0);
				this.itemAgeVar3Checked = false;
			} else {
				itemAgeSprite3.setFrame(1);
				this.itemAgeVar3Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar2Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite2.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));

		// option 4
		this.add.text(window.innerWidth * 0.325, window.innerHeight * 0.7, '45-54y', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite4 = this.add.sprite(window.innerWidth * 0.34, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite4.on('pointerdown', function (pointer) {
			if (this.itemAgeVar4Checked) {
				itemAgeSprite4.setFrame(0);
				this.itemAgeVar4Checked = false;
			} else {
				itemAgeSprite4.setFrame(1);
				this.itemAgeVar4Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar2Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite2.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));

		// option 5
		this.add.text(window.innerWidth * 0.425, window.innerHeight * 0.7, '55-64y', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite5 = this.add.sprite(window.innerWidth * 0.44, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite5.on('pointerdown', function (pointer) {
			if (this.itemAgeVar5Checked) {
				itemAgeSprite5.setFrame(0);
				this.itemAgeVar5Checked = false;
			} else {
				itemAgeSprite5.setFrame(1);
				this.itemAgeVar5Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar2Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar6Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite2.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));

		// option 6
		this.add.text(window.innerWidth * 0.525, window.innerHeight * 0.7, '65y and over', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite6 = this.add.sprite(window.innerWidth * 0.54, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite6.on('pointerdown', function (pointer) {
			if (this.itemAgeVar6Checked) {
				itemAgeSprite6.setFrame(0);
				this.itemAgeVar6Checked = false;
			} else {
				itemAgeSprite6.setFrame(1);
				this.itemAgeVar6Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar2Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar7Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite2.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite7.setFrame(0);

			}
		}.bind(this));

		// Don't know
		this.add.text(window.innerWidth * 0.625, window.innerHeight * 0.7, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '17px', color: '#000000' });

		var itemAgeSprite7 = this.add.sprite(window.innerWidth * 0.64, window.innerHeight * 0.75, 'checkbox', 0).setScale(0.4).setInteractive();

		itemAgeSprite7.on('pointerdown', function (pointer) {
			if (this.itemAgeVar7Checked) {
				itemAgeSprite7.setFrame(0);
				this.itemAgeVar7Checked = false;
			} else {
				itemAgeSprite7.setFrame(1);
				this.itemAgeVar7Checked = true;

				this.itemAgeVar1Checked = false;
				this.itemAgeVar2Checked = false;
				this.itemAgeVar3Checked = false;
				this.itemAgeVar4Checked = false;
				this.itemAgeVar5Checked = false;
				this.itemAgeVar6Checked = false;
				itemAgeSprite1.setFrame(0);
				itemAgeSprite2.setFrame(0);
				itemAgeSprite3.setFrame(0);
				itemAgeSprite4.setFrame(0);
				itemAgeSprite5.setFrame(0);
				itemAgeSprite6.setFrame(0);

			}
		}.bind(this));


		// instatiate and add new end scene with current data
		var endScene = undefined;

		// add button to request feedback
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => this.onBtnContinue());

		var textContinue = this.add.text(-50, -15, 'Continue!', { fontSize: '18px', color: '#ffffff' })
		var buttonContainer = this.add.container(window.innerWidth * 0.85, window.innerHeight * 0.80, [buttonContinue, textContinue])

	}

	logAnswers() {
		this.varObj.api.logQuestionnaire(8, this.item9Var1Checked, this.item9Var2Checked, this.item9Var3Checked, this.item9Var4Checked, this.item9Var5Checked, this.item9Var6Checked);
		this.varObj.api.logDemographics(this.itemAgeVar1Checked, this.itemAgeVar2Checked, this.itemAgeVar3Checked, this.itemAgeVar4Checked, this.itemAgeVar5Checked, this.itemAgeVar6Checked, this.itemAgeVar7Checked,
			this.itemGenderVar1Checked, this.itemGenderVar2Checked, this.itemGenderVar3Checked, this.itemGenderVar4Checked, this.itemGenderVar5Checked, this.itemGenderVar6Checked, this.itemGenderVar7Checked);
	}

	onBtnContinue() {
		if ([this.item9Var1Checked, this.item9Var2Checked, this.item9Var3Checked, this.item9Var4Checked, this.item9Var5Checked, this.item9Var6Checked].every(a => a == false)) {
			alert("Please answer all questions!");
		}
		else {
			this.logAnswers();

			var endScene = new EndScene(this.varObj);
			this.scene.remove('endScene', endScene);
			this.scene.add('endScene', endScene);
			this.scene.start('endScene');
			this.scale.stopFullscreen();
		}
	}

	update() { }

}

export default QuestionnaireScene4;
