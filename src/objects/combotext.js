import game from '../jetpack';

export default class ComboText extends Phaser.Sprite {
	constructor() {
		super(game, -100, -100, 'combo');
		game.add.existing(this);
		this.animations.add('2', [0, 1], 10, true);
		this.animations.add('3', [2, 3], 10, true);
		this.animations.add('4', [4, 5], 10, true);
		this.animations.add('5', [6, 7], 10, true);
		this.anchor.set(0.5);
	}

	update() {
		this.y -= 1;
		this.alpha -= 0.01;
	}

	appear(x, y, multiplier) {
		this.x = x;
		this.y = y;
		this.alpha = 1;
		multiplier = Math.min(multiplier, 5);
		this.animations.play('' + multiplier);
		game.sfx.combo[multiplier - 2].play();
	}
}