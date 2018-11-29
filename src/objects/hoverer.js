import game from '../jetpack';
import Triangle from './triangle';

export default class Hoverer extends Phaser.Group {
	constructor(x, y, inverted, moving) {
		super(game);

		if (x < 315) this.x = -200;
		else         this.x = 830;
		this.y = y;

		this.moving = moving;
		if (this.moving) {
			this.x += this.x - x;
		} else {
			game.add.tween(this).to({x: x}, 5*Math.abs(this.x-x)).start();
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
		this.robody.body.offset.set(16);
		this.robody.body.width = 64;
		this.robody.body.height = 88;

		this.add(this.eye);
		this.add(this.robody);

		this.enemyType = 1;
	}

	update() {
		if (this.moving) {
			if (this.x > 550) {
				this.vx = -3;
			} else if (this.x < 80) {
				this.vx = 3;
			}
			this.x += this.vx;
		}
		if (this.dead) {
			if (this.inverted) this.y -= 4;
			else               this.y += 4;
			this.angle += 2;
		} else {
			this.y += Math.sin(0.005*game.time.now);
		}
	}

	destroy() {
		this.triangle.destroy();
		super.destroy();
	}
}