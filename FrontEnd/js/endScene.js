class EndScene extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({key : 'endScene'});
		this.varObj = varObj
	}

	init() { }

	preload() {
		// load button images
		this.load.spritesheet('checkbox', 'static/CheckBoxSprites.png', { frameWidth: 51, frameHeight: 50 });
		this.load.image('UBIE', 'static/UBF-logo.png');
		this.load.image('ITSML', 'static/ITS_ML_logo.png');
		this.load.image('buttonAgree', 'static/buttonSubmit.png');

	}

	create() {
		this.varObj.api.logUserPayment();	// Store (ecrypted) paymentId on server

		this.add.image(window.innerWidth * 0.1, window.innerHeight * 0.1, 'UBIE').setScale(0.15);
		this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.1, 'ITSML').setScale(0.15);

		var qIntro = [
			'You have completed the study.',
			'',
			'Thank you very much for your participation!',
			'',
			'Your unique survey completion code is:',
			'',
			this.varObj.api.paymentId,
			'',
			'Note down this code, return to AMT and paste the code into the box to receive your payment.',
			'',
			'If you would like to know more about the aim of this work, click the button below.',
			'',
			'In case you have further questions or comments regarding this study, please contact Dr. Ulrike Kuhl at Bielefeld University: ukuhl@techfak.uni-bielefeld.de .',
			'',
			'You may close this window now.',
			''
		]

		// add button to start game and switch to fullscreen
		var buttonDebrief = this.add.image(0, 0, 'buttonAgree').setScale(0.65)
			.setInteractive()
			.on('pointerdown', () => { window.open('https://its-ml.de/index.php/pazdebrief/'); });

		//var textAgree = this.add.text(-55, -20, 'I agree to participate in this study.', { fontFamily: 'Arial', fontSize: '14px', color: '#000000' }).setOrigin(0);
		var textDebrief = this.add.text(-85, -25, ['Tell me more','about the study!'], { fontSize: '18px', color: '#000000' }).setOrigin(0);
		var buttonContainer = this.add.container(window.innerWidth * 0.7, window.innerHeight * 0.6, [buttonDebrief, textDebrief])

		this.add.text(window.innerWidth * 0.05, window.innerHeight * 0.20, qIntro, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

	  }

	update() { }

}

export default EndScene;
