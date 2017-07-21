import game from '../jetpack';
import ButtonText from '../objects/buttontext';

export default class MenuState extends Phaser.State {
	create() {
		this.background = game.add.image(0, 0, 'background');
		this.display = game.add.image(0, 100, 'display');

		var desc1 = ['PERSONAL ', 'COMPACT ', 'BACK-MOUNTED ', 'PORTABLE ', 'SMALL-SCALE ', 'MINIATURE '];
		var desc2 = ['FLYING ', 'LEVITATION ', 'HOVERING ', 'UN-FALLING ', 'AVIATION ', 'ASCENSION '];
		var desc3 = ['APPARATUS', 'MACHINE', 'DEVICE', 'APPLIANCE', 'UTENSIL', 'CONTRAPTION'];
		var description;
		do {
			description = 
				desc1[Math.floor(Math.random() * desc1.length)] +
				desc2[Math.floor(Math.random() * desc2.length)] +
				desc3[Math.floor(Math.random() * desc3.length)];
		} while (description.length > 31);

		var testNumber = Math.floor(Math.random() * 10000);
		this.soundOptions = ['ON', 'OFF', 'SFX ONLY']
		
		var topText = game.add.text(158, 150, String.fromCharCode(9608), { font: '15px monospace', fill: '#00ff00', align: 'center'});
		topText.finalText = 'CFD INTERNAL PROTOTYPE\n"JETTISON PACK"\n' + description + '\nTEST #' + testNumber;
		topText.fullText = topText.finalText + '\n\n\nBEGIN\nCREDITS\nSOUND: ' + this.soundOptions[game.soundSetting];
		topText.progress = 0;
		topText.anchor.set(0.5, 0);

		game.time.events.repeat(40, topText.fullText.length, this.updateText, this, topText);
		game.sfx.beep.play();
	}

	updateText(text) {
		text.text = text.text.substring(0, text.text.length - 1) + text.fullText.charAt(text.progress) + String.fromCharCode(9608);
		text.progress++;
		if (text.progress == text.fullText.length) {
			game.sfx.beep.stop();
			text.text = text.finalText;
			game.add.existing(new ButtonText(158, 282, 'BEGIN', this.startGame, this));
			game.add.existing(new ButtonText(158, 304, 'CREDITS', this.viewCredits, this));
			this.soundButton = game.add.existing(new ButtonText(158, 326, 'SOUND: ' + this.soundOptions[game.soundSetting], this.toggleSound, this));
		}
	}

	startGame() {
		game.state.start('main');
	}

	viewCredits() {
		game.state.start('credits');
	}
	
	toggleSound() {
		game.soundSetting = (game.soundSetting + 1) % 3;
		if (game.soundSetting == 0) {
			game.sfx.music.play();
		} else if (game.soundSetting == 1) {
			game.sound.mute = true;
			game.sfx.music.pause();
		} else if (game.soundSetting == 2) {
			game.sound.mute = false;
			game.sfx.gun.play();
		}
		this.soundButton.text = 'SOUND: ' + this.soundOptions[game.soundSetting];
	}
}