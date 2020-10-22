import StableScene from './stableScene.js';

class StartScene extends Phaser.Scene {

	constructor(varObj) {
		super({key : 'startScene'});
		this.varObj = varObj;
	}

	init() {}

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
		// set the start screen:

		var textBlock1 = [
			"Welcome to the Alien Zoo!",
			"",
			"Your task today is to feed a pack of little aliens, the so-called Shubs:"
    ];

		var textBlock2 = [
			"Per round, you may feed up to 6 leaves per plant - any combination of plant leaves is possible.",
			"But beware: Not all plants might be good for our pack!",
			"If you have chosen a healthy combination, your pack size will increase.",
			"If you have chosen an unhealthy combination, your pack size will decrease."
    ];

		if(this.varObj.api.controlGroup) {
			var textBlock3 = [
				"After three rounds, you will get a summary of your past choices.",
				"Also, there will be feedback on what other users tried at that point in time.",
				"During the game, please do not resize our window or use the back button of your browser.",
				"If you are ready to start, hit the start button.",
			];

		} else {
			var textBlock3 = [
				"After three rounds, you will get a summary of your past choices.",
				"Also, there will be feedback on what choice would have led to a better result.",
				"During the game, please do not resize our window or use the back button of your browser.",
				"If you are ready to start, hit the start button.",

			];
		}

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.025, textBlock1, { fontSize: '17px', color: '#000000', align: 'left'});

		this.add.sprite(window.innerWidth * 0.25, window.innerHeight * 0.175, 'shub', 0, { frameWidth: 50, frameHeight: 46 }).setScale(1.5);
		this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.175, 'shub', 5, { frameWidth: 50, frameHeight: 47 }).setScale(1.5);
		this.add.sprite(window.innerWidth * 0.75, window.innerHeight * 0.175, 'shub', 8, { frameWidth: 50, frameHeight: 48 }).setScale(1.5);

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.250, 'For feeding, you can select from 5 different plants:', { fontSize: '17px', color: '#000000' });

		this.add.image(window.innerWidth * 0.20, window.innerHeight * 0.350, 'plant1').setScale(0.15);
		this.add.image(window.innerWidth * 0.35, window.innerHeight * 0.350, 'plant2').setScale(0.15);
		this.add.image(window.innerWidth * 0.50, window.innerHeight * 0.350, 'plant3').setScale(0.15);
		this.add.image(window.innerWidth * 0.65, window.innerHeight * 0.350, 'plant4').setScale(0.15);
		this.add.image(window.innerWidth * 0.80, window.innerHeight * 0.350, 'plant5').setScale(0.15);

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.425, textBlock2, { fontSize: '17px', color: '#000000', align: 'left', lineSpacing: 10});

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.575, textBlock3, { fontSize: '17px', color: '#000000', align: 'left', lineSpacing: 10});

		// instatiate and add new stable scene with current data
		var stableScene = undefined;
		//this.scene.add('stableScene', stableScene);

		// add button to start game and switch to fullscreen
		var buttonStart = this.add.image(0, 0, 'buttonFeed').setScale(0.4)
			.setInteractive()
			.on('pointerdown', () => this.scale.startFullscreen())
			.on('pointerdown', () => stableScene = new StableScene(this.varObj))
			.on('pointerdown', () => this.scene.add('stableScene', stableScene))
			.on('pointerdown', () => this.scene.start('stableScene'));

		var textStart = this.add.text(-40, -15, 'Start!', { fontSize: '20px', color: '#000000' }).setOrigin(0);
		var buttonContainer = this.add.container(window.innerWidth * 0.85, window.innerHeight * 0.70, [buttonStart, textStart])
	}

	update() {}

}

export default StartScene;
