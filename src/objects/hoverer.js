import game from '../jetpack';
import Triangle from './triangle';

export default class Hoverer extends Phaser.Group {
	constructor(x, y, inverted, moving) {
		super(game);

		if (x < 157) this.x = -50;
		else         this.x = 365;
		this.y = y;

		this.moving = moving;
		if (this.moving) {
			this.x += this.x - x;
		} else {
			game.add.tween(this).to({x: x}, 10*Math.abs(this.x-x)).start();
		}

		this.triangle = new Triangle(this, false);

		this.eye = game.add.sprite(0, 0, 'eye');
		this.eye.anchor.set(0.5);

		this.inverted = inverted;
		this.robody = game.add.sprite(0, 0, 'hoverer');
		
		if (this.inverted) {
			this.robody.animations.add('hover', [4, 5, 6, 7], 30, true);
			this.robody.anchor.set(0.5, 0.6);
		} else {
			this.robody.animations.add('hover', [0, 1, 2, 3], 30, true);
			this.robody.anchor.set(0.5, 0.4);
		}
		this.robody.animations.play('hover');
		
		game.physics.arcade.enable(this.robody);
		this.robody.body.immovable = true;
		this.robody.body.offset.set(8);
		this.robody.body.width = 32;
		this.robody.body.height = 44;

		this.add(this.eye);
		this.add(this.robody);

		this.enemyType = 1;
	}

	update() {
		if (this.moving) {
			if (this.x > 275) {
				this.vx = -1.5;
			} else if (this.x < 40) {
				this.vx = 1.5;
			}
			this.x += this.vx;
		}
		if (this.dead) {
			if (this.inverted) this.y -= 2;
			else               this.y += 2;
			this.angle += 2;
		} else {
			this.y += 1.5*Math.sin(game.time.now);
		}
	}

	destroy() {
		this.triangle.destroy();
		super.destroy();
	}
}