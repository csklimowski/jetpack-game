import game from '../jetpack';

export default class Triangle extends Phaser.Sprite {
	constructor(pointTo, isPlayer) {
		super(game, 0, 0, 'triangle');

		game.add.existing(this);
		if (isPlayer) this.frame = 1;
		this.anchor.set(1, 0.5);
		this.pointTo = pointTo;
	}

	update() {
		this.x = Math.max(game.camera.x + 10, Math.min(this.pointTo.x, game.camera.x + 305));
		this.y = Math.max(game.camera.y + 10, Math.min(this.pointTo.y, game.camera.y + 550));
		this.rotation = game.physics.arcade.angleBetween(this, this.pointTo);

		if (
			this.pointTo.x > game.camera.x && 
			this.pointTo.x < (game.camera.x + 315) &&
			this.pointTo.y > game.camera.y &&
			this.pointTo.y < (game.camera.y + 560)
		) {
			this.scale.set(0);
		} else {
			this.scale.set(1);
		}
	}
}