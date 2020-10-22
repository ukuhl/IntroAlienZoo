class EndScene extends Phaser.Scene {

	//constructor(plants, trialCount,this.varObj.clickCountVar1,this.varObj.clickCountVar2,this.varObj.clickCountVar3,this.varObj.clickCountVar4,this.varObj.clickCountVar5,oldNumber,newNumber,maxFeedingNo, minFeedingNo) {
	constructor(varObj) {
		super({key : 'endScene'});
		this.varObj = varObj
	}

	init() {}

	preload() {}

	create() {
		// clean slate:
    this.children.removeAll();
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.05, 'You have completed the Alien Zoo game!', { fontSize: '20px', color: '#000000' });
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.10, 'To complete the study, please follow the link below and fill out the questionnaire.', { fontSize: '20px', color: '#000000' });
		this.add.text(window.innerWidth * 0.025, window.innerHeight * 0.15, '[INSERT LINK]', { fontSize: '20px', color: '#000000' });
    }

	update() {}

}

export default EndScene;
