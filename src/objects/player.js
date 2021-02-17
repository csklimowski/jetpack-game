import game from '../jetpack';
import Triangle from './triangle';

export default class Player extends Phaser.Sprite {
	constructor(x, y) {
		super(game, x, y, 'player');
		game.add.existing(this);

		this.animations.add('up-down', [1, 2, 4, 5, 6], 30, false);
		this.animations.add('down-up', [5, 4, 2, 1, 0], 30, false);
		this.anchor.set(0.5);

		this.weight = 200;
		this.health = 4;
		this.invincible = false;
		
		this.jet = game.add.emitter(0, 0);
		this.jet.makeParticles('fire');
		this.jet.gravity = -400;
		this.jet.minParticleSpeed.set(-100, 0);
		this.jet.maxParticleSpeed.set(100, 0);
		this.jet.setScale(1, 0.5, 1, 0.5, 1000);
		this.jet.setAlpha(1, 0, 2000);
		this.jet.start(false, 500, 15);
		this.jet.on = false;

		this.triangle = new Triangle(this, true);

		game.physics.arcade.enable(this);

		window.addEventListener("deviceorientation", this.onTilt.bind(this), true);
	}

	update() {
		if (this.body.y >= 1720 && !this.dead) {
			this.body.velocity.y += (this.weight - 2000) * 0.1;
		} else {
			this.body.velocity.y += this.weight * 0.2;
			if (this.ly >= 1720 && !this.dead) {
				this.animations.play('down-up');
				if (this.body.velocity.y < -1000) {
					this.body.velocity.y *= 0.8;
				}
			}
		}

		if (this.lvy <= 0 && this.body.velocity.y > 0 && this.frame != 6 && !this.dead) {
			this.animations.play('up-down');
		}

		if (this.body.x < -10) {
			this.body.x = -10;
			this.body.velocity.x *= -1;
		} else if (this.body.x > 580) {
			this.body.x = 580;
			this.body.velocity.x *= -1;
		}

		if (this.dead) {
			this.angle -= 1;
		}

		this.jet.x = this.body.x + 30;
		this.jet.y = this.body.y + 10;

		this.ly = this.body.y;
		this.lvy = this.body.velocity.y;
	}

	onTilt(event) {
		let newVel;
		if (event.gamma < 0) {
			newVel = Math.max(event.gamma*50, -700);
			this.scale.x = -1;
		} else {
			newVel = Math.min(event.gamma*50, 700);
			this.scale.x = 1;
		}
		this.body.velocity.x += 0.2*(newVel - this.body.velocity.x);
	}

	vincible() {
		this.invincible = false;
		this.alpha = 1;
	}

	jetpackOn() {
		if (!game.paused && !this.dead) {
			game.sfx.jetpack.play();
			this.jet.on = true;
			this.weight = 500;
		}
	}

	jetpackOff() {
		game.sfx.jetpack.stop();
		this.jet.on = false;
		this.weight = 200;
	}
}