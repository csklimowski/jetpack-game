import game from '../jetpack';
import ButtonText from '../objects/buttontext';

export default class ResultsState extends Phaser.State {
	create() {
		game.sfx.helicopter.stop();
		this.background = game.add.image(0, 0, 'background', 1);
		this.display = game.add.image(0, 540, 'display');
		this.camera.y = 1000;
		var topText = game.add.text(158, 590, String.fromCharCode(9608), { font: '15px monospace', fill: '#00ff00', align: 'center'});
		topText.finalText = 'TEST TERMINATED\n\nSCORE: ' + game.score;
		topText.fullText = topText.finalText + '\n\n\n\n\n\nRETURN';
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
			game.add.existing(new ButtonText(158, 767, 'RETURN', this.return, this));
		}
	}

	return() {
		game.state.start('menu');
	}
}