import game from '../jetpack';

export default class MenuState extends Phaser.State {
	create() {
		this.background = game.add.image(0, 0, 'background');
		this.display = game.add.image(0, 1080, 'display');
		game.camera.y = 1000;

		var desc1 = ['PERSONAL ', 'COMPACT ', 'BACK-MOUNTED ', 'PORTABLE ', 'SMALL-SCALE ', 'MINIATURE '];
		var desc2 = ['FLYING ', 'LEVITATION ', 'HOVERING ', 'UN-FALLING ', 'AVIATION ', 'ASCENSION '];
		var desc3 = ['APPARATUS', 'MACHINE', 'DEVICE', 'APPLIANCE', 'UTENSIL', 'CONTRAPTION'];
		var description;
		do {
			description = 
				desc1[Math.floor(Math.random() * desc1.length)] +
				desc2[Math.floor(Math.random() * desc2.length)] +
				desc3[Math.floor(Math.random() * desc3.length)];
		} while (description.length > 30);

		var testNumber = Math.floor(Math.random() * 10000);
		this.soundOptions = [
			{
				image: 'sound-on',
				text: 'ON'
			},
			{
				image: 'sound-off',
				text: 'OFF'
			},
			{
				image: 'sound-sfx-only',
				text: 'SFX ONLY'
			}
		];

		var topText = game.add.bitmapText(316, 1210, 'green', String.fromCharCode(9608), 32);
		topText.align = 'center';
		topText.anchor.set(0.5, 0);
		topText.finalText = 'CFD INTERNAL PROTOTYPE\n"JETTISON PACK"\n' + description + '\nTEST #' + testNumber;
		topText.fullText = topText.finalText + '\n\n\n\nBEGIN\nCREDITS\nSOUND: ' + this.soundOptions[game.soundSetting].text;
		topText.progress = 0;
		topText.anchor.set(0.5, 0);

		game.time.events.repeat(40, topText.fullText.length, this.updateText, this, topText);
		game.sfx.beep.play();
	}

	updateText(text) {
		text.text = text.text.substring(0, text.text.length - 1) + text.fullText.charAt(text.progress) + String.fromCharCode(9608);
		text.progress++;
		if (text.progress === text.fullText.length) {
			game.sfx.beep.stop();
			text.text = text.finalText;
			game.add.button(265, 1485, 'begin', this.startGame, this, 1, 0, 1, 0);
			game.add.button(247, 1525, 'credits', this.viewCredits, this, 1, 0, 1, 0);
			this.soundButton = game.add.button(315, 1565, this.soundOptions[game.soundSetting].image, this.toggleSound, this, 1, 0, 1, 0);
			this.soundButton.anchor.set(0.5, 0);
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
			this.soundButton.loadTexture('sound-on');
			game.sfx.music.play();
		} else if (game.soundSetting == 1) {
			this.soundButton.loadTexture('sound-off');
			game.sound.mute = true;
			game.sfx.music.pause();
		} else if (game.soundSetting == 2) {
			this.soundButton.loadTexture('sound-sfx-only');
			game.sound.mute = false;
			game.sfx.gun.play();
		}
	}
}