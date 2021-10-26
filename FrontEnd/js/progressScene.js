import StableScene from './stableScene.js';

class ProgressScene extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({ key: 'progressScene' });
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
		// clean slate:
		this.children.removeAll();

		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, 'Feeding in progress...', { fontFamily: "Arial", fontSize: '20px', color: '#000000' });

		// add overview of current choice:
		this.add.image(window.innerWidth * 0.05, window.innerHeight * 0.175, 'plant1').setScale(0.15);
		this.add.text(window.innerWidth * 0.07, window.innerHeight * 0.175, 'x ' + this.varObj.clickCountVar1, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		this.add.image(window.innerWidth * 0.16, window.innerHeight * 0.175, 'plant2').setScale(0.15);
		this.add.text(window.innerWidth * 0.18, window.innerHeight * 0.175, 'x ' + this.varObj.clickCountVar2, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		this.add.image(window.innerWidth * 0.27, window.innerHeight * 0.175, 'plant3').setScale(0.15);
		this.add.text(window.innerWidth * 0.29, window.innerHeight * 0.175, 'x ' + this.varObj.clickCountVar3, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		this.add.image(window.innerWidth * 0.38, window.innerHeight * 0.175, 'plant4').setScale(0.15);
		this.add.text(window.innerWidth * 0.40, window.innerHeight * 0.175, 'x ' + this.varObj.clickCountVar4, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });
		this.add.image(window.innerWidth * 0.49, window.innerHeight * 0.175, 'plant5').setScale(0.15);
		this.add.text(window.innerWidth * 0.51, window.innerHeight * 0.175, 'x ' + this.varObj.clickCountVar5, { fontFamily: "Arial", fontSize: '20px', color: '#000000' });

		// add three shubs as 'loading animation'
		var progShubs = {
			key: 'progMove',
			frames: this.anims.generateFrameNumbers('shub', { start: 0, end: 9, first: Phaser.Math.Between(0, 9) }),
			frameRate: 10,
			repeat: -1,
			repeatDelay: 10
		};

		// create animation
		this.anims.create(progShubs);

		// add three shubs
		var progShub1 = this.add.sprite(window.innerWidth * 0.40, window.innerHeight * 0.5, 'shub', 0);
		var progShub2 = this.add.sprite(window.innerWidth * 0.50, window.innerHeight * 0.5, 'shub', 0);
		var progShub3 = this.add.sprite(window.innerWidth * 0.60, window.innerHeight * 0.5, 'shub', 0);

		// scale them
		progShub1.displayWidth = 45;
		progShub2.displayWidth = 45;
		progShub3.displayWidth = 45;

		progShub1.scaleY = progShub1.scaleX;
		progShub2.scaleY = progShub2.scaleX;
		progShub3.scaleY = progShub3.scaleX;

		// animate them
		progShub1.anims.delayedPlay(0, 'progMove', 0);
		progShub2.anims.delayedPlay(0, 'progMove', 0);
		progShub3.anims.delayedPlay(0, 'progMove', 0);

		// compute new Shub no, based on user input
		this.varObj.api.computeNewShubNo(this.varObj.newNumber, this.varObj.trialCount, this.varObj.blockCount, this.varObj.clickCountVar1, this.varObj.clickCountVar2, this.varObj.clickCountVar3, this.varObj.clickCountVar4, this.varObj.clickCountVar5).then((newShubData) => {
			if (newShubData == undefined) {
				throw "Error while computing new shub number"
			}

			var idx;
			if (this.varObj.trialCount % 3 == 0) {
				idx = 3
			} else {
				idx = this.varObj.trialCount % 3
			}

			// assign info to arrays for later feedback Scene
			this.varObj.in_array[idx] = [this.varObj.clickCountVar1, this.varObj.clickCountVar2, this.varObj.clickCountVar3, this.varObj.clickCountVar4, this.varObj.clickCountVar5];
			this.varObj.cf_array[idx] = [newShubData.counterfactualCountVars.var1, newShubData.counterfactualCountVars.var2, newShubData.counterfactualCountVars.var3, newShubData.counterfactualCountVars.var4, newShubData.counterfactualCountVars.var5];
			this.varObj.rand_array[idx] = [Phaser.Math.Between(0, 6), Phaser.Math.Between(0, 6), Phaser.Math.Between(0, 6), Phaser.Math.Between(0, 6), Phaser.Math.Between(0, 6)];
			this.varObj.shubOldNo[idx] = this.varObj.oldNumber;
			this.varObj.shubNewNo[idx] = newShubData.newNumShubs;
			this.varObj.newNumber = newShubData.newNumShubs;

			// Logging random feedback
			this.varObj.api.logUserPerformance(this.varObj.trialCount, this.varObj.blockCount, this.varObj.in_array[idx], this.varObj.cf_array[idx], this.varObj.oldNumber, newShubData.newNumShubs);

			// switch to stable Scene again
			this.scene.remove('stableScene', stableScene);
			var stableScene = new StableScene(this.varObj);
			this.scene.add('stableScene', stableScene);
			this.time.delayedCall(3000, () => {
				this.scene.start('stableScene')
			})
			//this.scene.start('stableScene');
		});
	}

	update() { }

}

export default ProgressScene;
