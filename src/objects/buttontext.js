import game from '../jetpack';

export default class ButtonText extends Phaser.BitmapText {
	constructor(x, y, text, whenPressed, whenPressedContext) {
		super(game, x, y, 'green', text, 32, 'center');
		this.anchor.set(0.5, 0);

		this.inputEnabled = true;
		this.events.onInputOver.add(function() {
			this.font = 'inverted';
		}, this);
    	this.events.onInputOut.add(function() {
			this.font = 'green';
		}, this);
    	this.events.onInputDown.add(whenPressed, whenPressedContext);
	}
}