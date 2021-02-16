import game from '../jetpack';

export default class ResultsState extends Phaser.State {
	create() {
		game.sfx.helicopter.stop();
		this.background = game.add.image(0, 0, 'background', 1);
		this.display = game.add.image(0, 1080, 'display');
		this.camera.y = 1000;

		let topText = game.add.bitmapText(316, 1210, 'green', String.fromCharCode(9608), 32);
		let reasonText, scoreText;

		let r1 = ['TRAGIC ', 'UNFORTUNATE ', 'CATASTROPHIC ', 'UNFORESEEN ', 'MINOR ', 'REGRETTABLE '];
		let r2 = ['AI ', 'ROBOTIC ', 'AUTOMATON ', 'EQUIPMENT ', 'TECHNOLOGICAL ', 'PROGRAMMING '];
		let r3 = ['FAILURE', 'MISTAKE', 'MISHAP', 'COMPLICATION', 'ACCIDENT', 'BUG'];
		do {
			reasonText = 
				r1[Math.floor(Math.random() * r1.length)] +
				r2[Math.floor(Math.random() * r2.length)] +
				r3[Math.floor(Math.random() * r3.length)];
		} while (reasonText.length > 30);

		if (game.score > game.data.highScore) {
			game.data.highScore = game.score;
			localStorage.setItem('blast_down_data', JSON.stringify(game.data));
			scoreText = 'NEW PERSONAL BEST!';
		} else {
			scoreText = 'YOUR BEST: ' + game.data.highScore;
		}

		topText.finalText = 'TEST TERMINATED\n\nREASON:\n' + reasonText + '\n\nSCORE: ' + game.score + '\n' + scoreText;
		topText.fullText = topText.finalText + '\n\n\nRETURN';
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
			game.add.button(264, 1566, 'return', this.return, this, 1, 0, 1, 0);
		}
	}

	return() {
		game.state.start('menu');
	}
}