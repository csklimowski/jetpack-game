import game from '../jetpack';
import ButtonText from '../objects/buttontext';

export default class CreditsState extends Phaser.State {
	create() {
		this.background = game.add.image(0, 0, 'background');
		this.display = game.add.image(0, 100, 'display');
		var topText = game.add.text(158, 150, String.fromCharCode(9608), { font: '15px monospace', fill: '#00ff00', align: 'center'});
		topText.fullText = 'DESIGN, PROGRAMMING, ART\nCHRIS KLIMOWSKI\n\nMUSIC\nGAMESOUNDS.XYZ\n\nSOUND EFFECTS\nFREESOUND.ORG\n\nBACK';
		topText.finalText = 'DESIGN, PROGRAMMING, ART\nCHRIS KLIMOWSKI\n\nMUSIC\nGAMESOUNDS.XYZ\n\nSOUND EFFECTS\nFREESOUND.ORG';
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
			game.add.existing(new ButtonText(158, 348, 'BACK', this.goBack, this));
		}
	}
	
	goBack() {
		game.state.start('menu');
	}
}