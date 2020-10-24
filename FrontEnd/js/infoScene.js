import StartScene from './startScene.js';

class InfoScene extends Phaser.Scene {

	constructor(varObj) {
		super({key : 'infoScene'});
		this.varObj = varObj;
		this.startTime = undefined;
	}

	init() {}

	preload() {

		// load logos
		this.load.image('UBIE', 'static/UBF-logo.png');
		this.load.image('ITSML', 'static/ITS_ML_logo.png');
		this.load.image('buttonAgree', 'static/buttonSubmit.png');

	}

	create() {

		this.startTime = new Date().getTime();

		this.add.image(window.innerWidth * 0.1, window.innerHeight * 0.1, 'UBIE').setScale(0.15); //.setScale(0.15)
		this.add.image(window.innerWidth * 0.8, window.innerHeight * 0.1, 'ITSML').setScale(0.15); // .setScale(0.15)

		var content = [

			"Welcome to the Alien Zoo study!",
			"",
			"The purpose of this research project is to examine human decision making under different feedback conditions.",
			"This is a research project being conducted by Dr. Ulrike Kuhl at Bielefeld University.",
			"",
			"People of any gender, aged 18 and above, are invited to participate.",
			"",
			"Your participation in this research study is voluntary. You may choose not to participate. If you decide to participate, you may withdraw at any time.",
			"If you decide not to participate in this study or if you withdrawl from participating at any time, you will not be penalized.",
			"",
			"The procedure involves playing a small online game that will take approximately XX minutes.",
			"Afterwards, you will be asked to answer a short questionnaire assessing your experience with the game.",
			"",
			"Your responses will be confidential and we do not collect identifying information such as your name, email address or IP address.",
			"We will do our best to keep your information confidential. All data is stored in a password protected electronic format.",
			"To help protect your confidentiality, the surveys will not contain information that will personally identify you.",
			"",
			"The results of this study will be used for scholarly purposes only.",
			"If you have any questions about the research study, please contact Dr. Ulrike Kuhl at ukuhl@techfak.uni-bielefeld.de .",
			"",
			"The study was approved by the Ethics Committee of Bielefeld University, Germany.",
			"",
			"ELECTRONIC CONSENT: Please select your choice below.",
			"",
			"Clicking on the 'agree' button indicates that:",
			"",
			"				• you have read the above information",
			"				• you voluntarily agree to participate",
			"				• you are at least 18 years of age",
			"",
			"If you do not wish to participate in the research study, please decline participation by closing this window."
    ];

    this.add.text(window.innerWidth * 0.05, window.innerHeight * 0.20, content, { fontFamily: 'Arial', fontSize: '14px', color: '#000000', align: 'left'});

		// instatiate new start scene
		var startScene = undefined;

		// add button to start game and switch to fullscreen
		var buttonAgree = this.add.image(0, 0, 'buttonAgree').setScale(0.5)
			.setInteractive()
			.on('pointerdown', () => this.logTime())
			.on('pointerdown', () => this.scale.startFullscreen())
			.on('pointerdown', () => startScene = new StartScene(this.varObj))
			.on('pointerdown', () => this.scene.add('startScene', startScene))
			.on('pointerdown', () => this.scene.start('startScene'));

		//var textAgree = this.add.text(-55, -20, 'I agree to participate in this study.', { fontFamily: 'Arial', fontSize: '14px', color: '#000000' }).setOrigin(0);
		var textAgree = this.add.text(-85, -15, 'I agree to participate.', { fontSize: '14px', color: '#000000' }).setOrigin(0);
		var buttonContainer = this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.85, [buttonAgree, textAgree])

	}

	logTime() {
		var time = new Date().getTime() - this.startTime;
		this.varObj.api.logTime(0, time);
	}

	update() {}

}

export default InfoScene;
