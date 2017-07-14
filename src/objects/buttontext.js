import game from '../jetpack';

export default class ButtonText extends Phaser.Text {
	constructor(x, y, text, whenPressed, whenPressedContext) {
		super(game, x, y, text, {
			font: '15px monospace',
			fill: '#00ff00',
		});
		this.anchor.set(0.5, 0);

		this.inputEnabled = true;

		this.events.onInputOver.add(this.onOver, this);
    	this.events.onInputOut.add(this.onOut, this);
    	this.events.onInputDown.add(whenPressed, whenPressedContext);
	}

	onOver() {
		this.setStyle({
			font: '15px monospace',
			fill: '#000000',
			backgroundColor: '#00ff00'
		});
	}
	onOut() {
		this.setStyle({
			font: '15px monospace',
			fill: '#00ff00',
		});
	}
}