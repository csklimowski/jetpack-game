import game from '../jetpack';
import ButtonText from '../objects/buttontext';

export default class CreditsState extends Phaser.State {
	create() {
		this.background = game.add.image(0, 0, 'background');
		this.display = game.add.image(0, 1080, 'display');
		this.camera.y = 1000;

		var topText = game.add.bitmapText(316, 1210, 'green', String.fromCharCode(9608), 32);
		topText.fullText = 'DESIGN, PROGRAMMING, ART\nCHRIS KLIMOWSKI\n\nMUSIC\nINCOMPETECH\n\nSOUND EFFECTS\nFREESOUND.ORG\n\nRETURN';
		topText.finalText = 'DESIGN, PROGRAMMING, ART\nCHRIS KLIMOWSKI\n\nMUSIC\nINCOMPETECH\n\nSOUND EFFECTS\nFREESOUND.ORG';
		topText.align = 'center';
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
			game.add.button(264, 1566, 'return', this.goBack, this, 1, 0, 1, 0);
		}
	}
	
	goBack() {
		game.state.start('menu');
	}
}