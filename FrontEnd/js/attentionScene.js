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

    this.add.text(window.innerWidth * 0.1, window.innerHeight * 0.1, 'Quick question: How many Shubs were in your pack in the last round?', { fontFamily: "Arial", fontSize: '18px', color: '#000000' });
    this.add.text(window.innerWidth * 0.1, window.innerHeight * 0.2, 'Please enter the number in the box below before continuing.', { fontFamily: "Arial", fontSize: '18px', color: '#000000' });

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

    	var textContinue = this.add.text(-95, -20, 'Continue!', { fontSize: '25px', color: '#ffffff' });
    	this.add.container(window.innerWidth * 0.8, window.innerHeight * 0.5, [buttonContinue, textContinue]);

  }

  onBtnContinue() {
    if(this.inputText.text == "") {
      //alert("Please enter a number!");
			// alerts cause issues in fullscreen mode, here's a workaround:

			// background
			var warnDialogBG = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0xFFFFFF, 0.5).setOrigin(0);
			// dialog
			var warnDialog = this.add.rectangle((window.innerWidth * 0.5)-200, (window.innerHeight * 0.5)-130, 400, 200, 0xFFFFFF, 1).setOrigin(0);
			warnDialog.setStrokeStyle(1, 0x1000000, 1);
			var warnDialogTxt = this.add.text((window.innerWidth * 0.5)-150, (window.innerHeight * 0.5)-80, "Please enter a number!", { fontFamily: "Arial", fontSize: '25px', color: '#000000' }).setOrigin(0);
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
      this.logAnswer();
      this.logTime();

			////////
			if(this.varObj.oldNumber==this.inputText.text){

				var infoTxt = [
					'Your answer was correct! Good job!',
					'',
					'Please keep paying close attention to',
					'ALL aspects of the game at any time.',
					'',
					'If your responses fail to meet our quality control standards,',
					'your HIT is likely to be rejected!',
				]

			} else {

				var infoTxt = [
					'Your answer was NOT correct! Oh no!',
					'',
					'Please keep paying close attention to',
					'ALL aspects of the game at any time.',
					'',
					'If your responses fail to meet our quality control standards,',
					'your HIT is likely to be rejected!',
				]
			}

			var infoDialogBG = this.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0xFFFFFF, 0.5).setOrigin(0);
			// dialog and text
			var infoDialog = this.add.rectangle((window.innerWidth * 0.5)-300, (window.innerHeight * 0.5)-260, 800, 400, 0xFFFFFF, 1).setOrigin(0);
			infoDialog.setStrokeStyle(1, 0x1000000, 1);

			var infoDialogTxt = this.add.text((window.innerWidth * 0.5)-220, (window.innerHeight * 0.5)-200, infoTxt, { fontFamily: "Arial", fontSize: '25px', color: '#000000', align: 'center' }).setOrigin(0);

			setTimeout(function() {
				var buttonOK = this.add.rectangle((window.innerWidth * 0.5)+50, (window.innerHeight * 0.5)+25, 100, 50, 0x1a65ac, 1).setOrigin(0);
				buttonOK.setStrokeStyle(1, 0x1000000, 1);
				var buttontextOK = this.add.text((window.innerWidth * 0.5)+80, (window.innerHeight * 0.5)+35, 'Ok', { fontFamily: "Arial", fontSize: '25px', color: '#FFFFFF' }).setOrigin(0);

				var progressScene = new ProgressScene(this.varObj);

				buttonOK
					.setInteractive()
					.on('pointerdown', () => { infoDialogBG.destroy(); })
					.on('pointerdown', () => { infoDialog.destroy(); })
					.on('pointerdown', () => { infoDialogTxt.destroy(); })
					.on('pointerdown', () => { buttonOK.destroy(); })
					.on('pointerdown', () => { buttontextOK.destroy(); })
					.on('pointerdown', () => { this.scene.remove('progressScene', progressScene); })
					.on('pointerdown', () => { this.scene.add('progressScene', progressScene); })
					.on('pointerdown', () => { this.scene.start('progressScene'); });

			}.bind(this), this.varObj.btnOkayShowDelay);

			///////
      //var progressScene = new ProgressScene(this.varObj);
      //this.scene.remove('progressScene', progressScene);
      //this.scene.add('progressScene', progressScene);
      //this.scene.start('progressScene');


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
