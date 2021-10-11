import ProgressScene from './progressScene.js';

class AttentionScene extends Phaser.Scene {

	constructor(varObj) {
  	super({ key: 'attentionScene' });
  	this.varObj = varObj
  	this.startTime = undefined;
    this.inputText = undefined;
	}

	init() { }

  preload() {
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }

  create() {

    this.startTime = new Date().getTime();

    this.add.text(window.innerWidth * 0.1, window.innerHeight * 0.1, 'Quick question: How many Shubs were in your pack in the last round?', { fontSize: '18px', color: '#000000' });
    this.add.text(window.innerWidth * 0.1, window.innerHeight * 0.2, 'Please enter the number in the box below before continuing.', { fontSize: '18px', color: '#000000' });

    this.inputText = this.add.rexInputText(window.innerWidth * 0.1, window.innerHeight * 0.4, 200, 50, {
        id: 'myNumberInput',
        type: 'number',
        fontSize: '16px',
        color: '#000000',
        border: 3,
        backgroundColor: '#cccccc',
        borderColor: '#000000',
    })
        .setOrigin(0)

    this.inputText.node.addEventListener("keypress", function (evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
        }
    });

    // To do: log value of inputText.text

    var style = document.createElement('style');
    style.innerHTML = `
    #myNumberInput::-webkit-inner-spin-button,
    #myNumberInput::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }`;
    document.head.appendChild(style);

    // add button to continue
    // instatiate and add new end scene with current data
    //var progressScene = undefined;

    // add button to request feedback
    var buttonContinue = this.add.image(0, 0, 'buttonFeed').setScale(0.5)
    	.setInteractive()
    	/*.on('pointerdown', () => this.logTime())
    	.on('pointerdown', () => progressScene = new ProgressScene(this.varObj))
    	.on('pointerdown', () => this.scene.remove('progressScene', progressScene))
    	.on('pointerdown', () => this.scene.add('progressScene', progressScene))
    	.on('pointerdown', () => this.scene.start('progressScene'));*/
      .on('pointerdown', () => this.onBtnContinue());

    	var textContinue = this.add.text(-95, -20, 'Continue!', { fontSize: '25px', color: '#000000' });
    	this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonContinue, textContinue]);

  }

  onBtnContinue() {
    if(this.inputText.text == "") {
      alert("Please enter a number!");
    }
    else {
      this.logAnswer();
      this.logTime();
      var progressScene = new ProgressScene(this.varObj);
      this.scene.remove('progressScene', progressScene);
      this.scene.add('progressScene', progressScene);
      this.scene.start('progressScene');
    }
  }

  logAnswer() {
    this.varObj.api.logAttention(this.inputText.text, this.varObj.trialCount, this.varObj.oldNumber);
  }

  logTime() {
    var time = new Date().getTime() - this.startTime;
    this.varObj.api.logTime(6, time);
  }

  update() { }
}

export default AttentionScene;
