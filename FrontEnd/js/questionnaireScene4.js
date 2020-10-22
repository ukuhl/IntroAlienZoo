import EndScene from './endScene.js';

class QuestionnaireScene4 extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({key : 'questionnaireScene4'});
		this.varObj = varObj
	}

	init() { }

	preload() {
		// load button images
		//this.load.image('checkboxEmpty', 'static/CheckBoxEmpty.png');
		//this.load.image('checkboxClicked', 'static/CheckBoxClicked.png');
		this.load.spritesheet('checkbox', 'static/CheckBoxSprites.png', { frameWidth: 51, frameHeight: 50 });
	}

	create() {

		var item9Var1Checked = false;
		var item9Var2Checked = false;
		var item9Var3Checked = false;
		var item9Var4Checked = false;
		var item9Var5Checked = false;
		var item9Var6Checked = false;

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

		var qIntro = [
			'To complete the study, please answer the following 9 questions.',
			'Please answer as truthfully and accurately as possible.',
			'These questions are designed to assess your personal impressions from the game. Therefore, there are no wrong answers.',
		]

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, qIntro, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		if(this.varObj.api.controlGroup) {
			var item9 = [
				"9. I received the feedback based on what other users tried at that point in time in the game in a timely and efficient manner."
			];
		} else {
			var item9 = [
				"9. I received the feedback on what choice would have led to a better result in a timely and efficient manner."
			];
		}

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.15, item9, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.2, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite1.on('pointerdown', function (pointer) {
			if (item9Var1Checked) {
				item9Sprite1.setFrame(0);
				item9Var1Checked = false;
			} else {
				item9Sprite1.setFrame(1);
				item9Var1Checked = true;

				item9Var2Checked = false;
				item9Var3Checked = false;
				item9Var4Checked = false;
				item9Var5Checked = false;
				item9Var6Checked = false;
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		});

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.2, 'Disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite2.on('pointerdown', function (pointer) {
			if (item9Var2Checked) {
				item9Sprite2.setFrame(0);
				item9Var2Checked = false;
			} else {
				item9Sprite2.setFrame(1);
				item9Var2Checked = true;

				item9Var1Checked = false;
				item9Var3Checked = false;
				item9Var4Checked = false;
				item9Var5Checked = false;
				item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		});

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.2, 'Neutral', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite3.on('pointerdown', function (pointer) {
			if (item9Var3Checked) {
				item9Sprite3.setFrame(0);
				item9Var3Checked = false;
			} else {
				item9Sprite3.setFrame(1);
				item9Var3Checked = true;

				item9Var1Checked = false;
				item9Var2Checked = false;
				item9Var4Checked = false;
				item9Var5Checked = false;
				item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		});

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.2, 'Agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite4.on('pointerdown', function (pointer) {
			if (item9Var4Checked) {
				item9Sprite4.setFrame(0);
				item9Var4Checked = false;
			} else {
				item9Sprite4.setFrame(1);
				item9Var4Checked = true;

				item9Var1Checked = false;
				item9Var2Checked = false;
				item9Var3Checked = false;
				item9Var5Checked = false;
				item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite5.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		});

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.2, 'Strongly agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite5.on('pointerdown', function (pointer) {
			if (item9Var5Checked) {
				item9Sprite5.setFrame(0);
				item9Var5Checked = false;
			} else {
				item9Sprite5.setFrame(1);
				item9Var5Checked = true;

				item9Var1Checked = false;
				item9Var2Checked = false;
				item9Var3Checked = false;
				item9Var4Checked = false;
				item9Var6Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite6.setFrame(0);

			}
		});

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.2, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item9Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.25, 'checkbox', 0).setScale(0.25).setInteractive();

		item9Sprite6.on('pointerdown', function (pointer) {
			if (item9Var6Checked) {
				item9Sprite6.setFrame(0);
				item9Var6Checked = false;
			} else {
				item9Sprite6.setFrame(1);
				item9Var6Checked = true;

				item9Var1Checked = false;
				item9Var2Checked = false;
				item9Var3Checked = false;
				item9Var4Checked = false;
				item9Var5Checked = false;
				item9Sprite1.setFrame(0);
				item9Sprite2.setFrame(0);
				item9Sprite3.setFrame(0);
				item9Sprite4.setFrame(0);
				item9Sprite5.setFrame(0);

			}
		});

		if(this.varObj.api.controlGroup) {
		  var item10 = [
		    "7. I did not find inconsistencies in the feedback based on what other users tried at that point in time in the game."
		  ];
		} else {
		  var item10 = [
		    "7. I did not find inconsistencies in the feedback on what choice would have led to a better result."
		  ];
		}

		/*
		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.325, item10, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.375, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite1.on('pointerdown', function (pointer) {
		  if (item10Var1Checked) {
		    item10Sprite1.setFrame(0);
		    item10Var1Checked = false;
		  } else {
		    item10Sprite1.setFrame(1);
		    item10Var1Checked = true;

		    item10Var2Checked = false;
		    item10Var3Checked = false;
		    item10Var4Checked = false;
		    item10Var5Checked = false;
		    item10Var6Checked = false;
		    item10Sprite2.setFrame(0);
		    item10Sprite3.setFrame(0);
		    item10Sprite4.setFrame(0);
		    item10Sprite5.setFrame(0);
		    item10Sprite6.setFrame(0);

		  }
		});

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.375, 'Disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite2.on('pointerdown', function (pointer) {
		  if (item10Var2Checked) {
		    item10Sprite2.setFrame(0);
		    item10Var2Checked = false;
		  } else {
		    item10Sprite2.setFrame(1);
		    item10Var2Checked = true;

		    item10Var1Checked = false;
		    item10Var3Checked = false;
		    item10Var4Checked = false;
		    item10Var5Checked = false;
		    item10Var6Checked = false;
		    item10Sprite1.setFrame(0);
		    item10Sprite3.setFrame(0);
		    item10Sprite4.setFrame(0);
		    item10Sprite5.setFrame(0);
		    item10Sprite6.setFrame(0);

		  }
		});

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.375, 'Neutral', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite3.on('pointerdown', function (pointer) {
		  if (item10Var3Checked) {
		    item10Sprite3.setFrame(0);
		    item10Var3Checked = false;
		  } else {
		    item10Sprite3.setFrame(1);
		    item10Var3Checked = true;

		    item10Var1Checked = false;
		    item10Var2Checked = false;
		    item10Var4Checked = false;
		    item10Var5Checked = false;
		    item10Var6Checked = false;
		    item10Sprite1.setFrame(0);
		    item10Sprite2.setFrame(0);
		    item10Sprite4.setFrame(0);
		    item10Sprite5.setFrame(0);
		    item10Sprite6.setFrame(0);

		  }
		});

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.375, 'Agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite4.on('pointerdown', function (pointer) {
		  if (item10Var4Checked) {
		    item10Sprite4.setFrame(0);
		    item10Var4Checked = false;
		  } else {
		    item10Sprite4.setFrame(1);
		    item10Var4Checked = true;

		    item10Var1Checked = false;
		    item10Var2Checked = false;
		    item10Var3Checked = false;
		    item10Var5Checked = false;
		    item10Var6Checked = false;
		    item10Sprite1.setFrame(0);
		    item10Sprite2.setFrame(0);
		    item10Sprite3.setFrame(0);
		    item10Sprite5.setFrame(0);
		    item10Sprite6.setFrame(0);

		  }
		});

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.375, 'Strongly agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite5.on('pointerdown', function (pointer) {
		  if (item10Var5Checked) {
		    item10Sprite5.setFrame(0);
		    item10Var5Checked = false;
		  } else {
		    item10Sprite5.setFrame(1);
		    item10Var5Checked = true;

		    item10Var1Checked = false;
		    item10Var2Checked = false;
		    item10Var3Checked = false;
		    item10Var4Checked = false;
		    item10Var6Checked = false;
		    item10Sprite1.setFrame(0);
		    item10Sprite2.setFrame(0);
		    item10Sprite3.setFrame(0);
		    item10Sprite4.setFrame(0);
		    item10Sprite6.setFrame(0);

		  }
		});

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.375, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item10Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.45, 'checkbox', 0).setScale(0.25).setInteractive();

		item10Sprite6.on('pointerdown', function (pointer) {
		  if (item10Var6Checked) {
		    item10Sprite6.setFrame(0);
		    item10Var6Checked = false;
		  } else {
		    item10Sprite6.setFrame(1);
		    item10Var6Checked = true;

		    item10Var1Checked = false;
		    item10Var2Checked = false;
		    item10Var3Checked = false;
		    item10Var4Checked = false;
		    item10Var5Checked = false;
		    item10Sprite1.setFrame(0);
		    item10Sprite2.setFrame(0);
		    item10Sprite3.setFrame(0);
		    item10Sprite4.setFrame(0);
		    item10Sprite5.setFrame(0);

		  }
		});

		if(this.varObj.api.controlGroup) {
		  var item11 = [
		    "8. I think most people would learn to work with the feedback based on what other users tried at that point in time in the game very quickly."
		  ];
		} else {
		  var item11 = [
		    "8. I think most people would learn to work with the feedback on what choice would have led to a better result very quickly."
		  ];
		}

		// add item 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.5, item11, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		// option 1
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.55, 'Strongly disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite1 = this.add.sprite(window.innerWidth * 0.05, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite1.on('pointerdown', function (pointer) {
		  if (item11Var1Checked) {
		    item11Sprite1.setFrame(0);
		    item11Var1Checked = false;
		  } else {
		    item11Sprite1.setFrame(1);
		    item11Var1Checked = true;

		    item11Var2Checked = false;
		    item11Var3Checked = false;
		    item11Var4Checked = false;
		    item11Var5Checked = false;
		    item11Var6Checked = false;
		    item11Sprite2.setFrame(0);
		    item11Sprite3.setFrame(0);
		    item11Sprite4.setFrame(0);
		    item11Sprite5.setFrame(0);
		    item11Sprite6.setFrame(0);

		  }
		});

		// option 2
		this.add.text(window.innerWidth * 0.175, window.innerHeight * 0.55, 'Disagree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite2 = this.add.sprite(window.innerWidth * 0.20, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite2.on('pointerdown', function (pointer) {
		  if (item11Var2Checked) {
		    item11Sprite2.setFrame(0);
		    item11Var2Checked = false;
		  } else {
		    item11Sprite2.setFrame(1);
		    item11Var2Checked = true;

		    item11Var1Checked = false;
		    item11Var3Checked = false;
		    item11Var4Checked = false;
		    item11Var5Checked = false;
		    item11Var6Checked = false;
		    item11Sprite1.setFrame(0);
		    item11Sprite3.setFrame(0);
		    item11Sprite4.setFrame(0);
		    item11Sprite5.setFrame(0);
		    item11Sprite6.setFrame(0);

		  }
		});

		// option 3
		this.add.text(window.innerWidth * 0.335, window.innerHeight * 0.55, 'Neutral', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite3 = this.add.sprite(window.innerWidth * 0.35, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite3.on('pointerdown', function (pointer) {
		  if (item11Var3Checked) {
		    item11Sprite3.setFrame(0);
		    item11Var3Checked = false;
		  } else {
		    item11Sprite3.setFrame(1);
		    item11Var3Checked = true;

		    item11Var1Checked = false;
		    item11Var2Checked = false;
		    item11Var4Checked = false;
		    item11Var5Checked = false;
		    item11Var6Checked = false;
		    item11Sprite1.setFrame(0);
		    item11Sprite2.setFrame(0);
		    item11Sprite4.setFrame(0);
		    item11Sprite5.setFrame(0);
		    item11Sprite6.setFrame(0);

		  }
		});

		// option 4
		this.add.text(window.innerWidth * 0.485, window.innerHeight * 0.55, 'Agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite4 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite4.on('pointerdown', function (pointer) {
		  if (item11Var4Checked) {
		    item11Sprite4.setFrame(0);
		    item11Var4Checked = false;
		  } else {
		    item11Sprite4.setFrame(1);
		    item11Var4Checked = true;

		    item11Var1Checked = false;
		    item11Var2Checked = false;
		    item11Var3Checked = false;
		    item11Var5Checked = false;
		    item11Var6Checked = false;
		    item11Sprite1.setFrame(0);
		    item11Sprite2.setFrame(0);
		    item11Sprite3.setFrame(0);
		    item11Sprite5.setFrame(0);
		    item11Sprite6.setFrame(0);

		  }
		});

		// option 5
		this.add.text(window.innerWidth * 0.615, window.innerHeight * 0.55, 'Strongly agree', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite5 = this.add.sprite(window.innerWidth * 0.65, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite5.on('pointerdown', function (pointer) {
		  if (item11Var5Checked) {
		    item11Sprite5.setFrame(0);
		    item11Var5Checked = false;
		  } else {
		    item11Sprite5.setFrame(1);
		    item11Var5Checked = true;

		    item11Var1Checked = false;
		    item11Var2Checked = false;
		    item11Var3Checked = false;
		    item11Var4Checked = false;
		    item11Var6Checked = false;
		    item11Sprite1.setFrame(0);
		    item11Sprite2.setFrame(0);
		    item11Sprite3.setFrame(0);
		    item11Sprite4.setFrame(0);
		    item11Sprite6.setFrame(0);

		  }
		});

		// Don't know
		this.add.text(window.innerWidth * 0.755, window.innerHeight * 0.55, 'I prefer not to answer.', { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

		var item11Sprite6 = this.add.sprite(window.innerWidth * 0.80, window.innerHeight * 0.625, 'checkbox', 0).setScale(0.25).setInteractive();

		item11Sprite6.on('pointerdown', function (pointer) {
		  if (item11Var6Checked) {
		    item11Sprite6.setFrame(0);
		    item11Var6Checked = false;
		  } else {
		    item11Sprite6.setFrame(1);
		    item11Var6Checked = true;

		    item11Var1Checked = false;
		    item11Var2Checked = false;
		    item11Var3Checked = false;
		    item11Var4Checked = false;
		    item11Var5Checked = false;
		    item11Sprite1.setFrame(0);
		    item11Sprite2.setFrame(0);
		    item11Sprite3.setFrame(0);
		    item11Sprite4.setFrame(0);
		    item11Sprite5.setFrame(0);

		  }
		});
		*/

		// instatiate and add new end scene with current data
		var endScene = undefined;

		// add button to request feedback
		var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => endScene = new EndScene(this.varObj))
			.on('pointerdown', () => this.scene.remove('endScene', endScene))
			.on('pointerdown', () => this.scene.add('endScene', endScene))
			.on('pointerdown', () => this.scene.start('endScene'));

		var textContinue = this.add.text(-50, -15, 'Continue!', { fontSize: '18px', color: '#000000' })
		var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.70, [buttonContinue, textContinue])

	}

	update() { }

}

export default QuestionnaireScene4;
