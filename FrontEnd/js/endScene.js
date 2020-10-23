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

	}

	create() {

		this.add.image(window.innerWidth * 0.1, window.innerHeight * 0.1, 'UBIE').setScale(0.15);
		this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.1, 'ITSML').setScale(0.15);

		var qIntro = [
			'You have completed the study.',
			'',
			'Thank you very much for your participation!',
			'',
			'If you have further questions or comments regarding this study, please contact Dr. Ulrike Kuhl at Bielefeld University: ukuhl@techfak.uni-bielefeld.de .',
			'',
			'You may close this window now.'
		]

		this.add.text(window.innerWidth * 0.05, window.innerHeight * 0.20, qIntro, { fontFamily: 'Arial', fontSize: '16px', color: '#000000' });

	  }

	update() { }

}

export default EndScene;
