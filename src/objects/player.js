import game from '../jetpack';
import Triangle from './triangle';

export default class Player extends Phaser.Sprite {
	constructor(x, y) {
		super(game, x, y, 'player');
		game.add.existing(this);

		this.animations.add('up-down', [1, 2, 4, 5, 6], 30, false);
		this.animations.add('down-up', [5, 4, 2, 1, 0], 30, false);
		this.anchor.set(0.5);

		this.weight = 100;
		this.health = 4;
		this.invincible = false;
		
		this.jet = game.add.emitter(0, 0);
		this.jet.makeParticles('fire');
		this.jet.gravity = -200;
		this.jet.minParticleSpeed.set(-50, 0);
		this.jet.maxParticleSpeed.set(50, 0);
		this.jet.setScale(1, 0.5, 1, 0.5, 1000);
		this.jet.setAlpha(1, 0, 2000);
		this.jet.start(false, 500, 15);
		this.jet.on = false;

		this.triangle = new Triangle(this, true);

		game.physics.arcade.enable(this);

		this.leftButton = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
		this.rightButton = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
		var downButton = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
		downButton.onDown.add(this.jetpackOn, this);
		downButton.onUp.add(this.jetpackOff, this);
	}

	update() {
		if (this.body.y >= 860 && !this.dead) {
			this.body.velocity.y += (this.weight - 1000) * 0.1;
		} else {
			this.body.velocity.y += this.weight * 0.2;
			if (this.ly >= 860 && !this.dead) {
				this.animations.play('down-up');
				if (this.body.velocity.y < -500) {
					this.body.velocity.y *= 0.8;
				}
			}
		}

		if (this.lvy <= 0 && this.body.velocity.y > 0 && this.frame != 6 && !this.dead) {
			this.animations.play('up-down');
		}

		if (this.leftButton.isDown && !this.dead) {
			if (this.scale.x > 0) this.scale.x = -1;
			this.body.velocity.x += 0.2*(-300-this.body.velocity.x);
		} else if (this.rightButton.isDown && !this.dead) {
			if (this.scale.x < 0) this.scale.x = 1;
			this.body.velocity.x += 0.2*(300-this.body.velocity.x);
		} else {
			this.body.velocity.x += 0.2*(0-this.body.velocity.x);
		}

		if (this.body.x < -5) {
			this.body.x = -5;
			this.body.velocity.x *= -1;
		} else if (this.body.x > 290) {
			this.body.x = 290;
			this.body.velocity.x *= -1;
		}

		if (this.dead) {
			this.angle -= 1;
		}

		this.jet.x = this.body.x + 15;
		this.jet.y = this.body.y + 5;

		this.ly = this.body.y;
		this.lvy = this.body.velocity.y;
	}

	vincible() {
		this.invincible = false;
		this.alpha = 1;
	}

	jetpackOn() {
		if (!game.paused && !this.dead) {
			game.sfx.jetpack.play();
			this.jet.on = true;
			this.weight = 250;
		}
	}

	jetpackOff() {
		game.sfx.jetpack.stop();
		this.jet.on = false;
		this.weight = 100;
	}
}