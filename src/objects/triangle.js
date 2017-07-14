import game from '../jetpack';

export default class Triangle extends Phaser.Sprite {
	constructor(pointTo) {
		super(game, 0, 0, 'triangle');
		game.add.existing(this);
		this.anchor.set(1, 0.5)
		this.pointTo = pointTo;
	}

	update() {
		if (this.pointTo) {
			this.x = Math.max(game.camera.x + 10, Math.min(this.pointTo.x, game.camera.x + 305));
			this.y = Math.max(game.camera.y + 10, Math.min(this.pointTo.y, game.camera.y + 550));

			this.rotation = game.physics.arcade.angleBetween(this, this.pointTo);
			this.scale.set(0.5);

			if (
				this.pointTo.x > game.camera.x && 
				this.pointTo.x < (game.camera.x + 315) &&
				this.pointTo.y > game.camera.y &&
				this.pointTo.y < (game.camera.y + 560)
			) {
				this.pointTo = null;
				this.x = 0;
				this.y = 0;
				this.scale.set(0);
			}
		} else {
			this.destroy();
		}
	}
}