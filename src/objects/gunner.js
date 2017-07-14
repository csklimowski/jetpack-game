import game from '../jetpack';
import Hoverer from './hoverer';

export default class Gunner extends Hoverer {
	constructor(x, y, inverted, moving) {
		super(x, y, inverted, moving);

		this.bullet = game.add.sprite(0, 0, 'bullet');
		this.bullet.anchor.set(0.5);
		this.bullet.animations.add('buzz', [0, 1, 2], 30, true);
		this.bullet.animations.play('buzz');
		game.physics.arcade.enable(this.bullet);
		this.bullet.body.immovable = true;

		this.gun = game.add.sprite(0, 0, 'gun');
		this.gun.anchor.set(0, 0.5);
		if (this.inverted) {
			this.gun.frame = 0;
			this.gun.animations.add('fire', [1, 2, 3, 4, 5, 0], 20, false);
		} else {
			this.gun.frame = 6;
			this.gun.animations.add('fire', [7, 8, 9, 10, 11, 6], 20, false);
		}
		this.add(this.gun);

		this.enemyType = 3;

		this.fireLoop = game.time.events.loop(2000, this.fire, this);
	}

	fire() {
		this.gun.animations.play('fire');
		this.bullet.x = this.x + Math.cos(this.gun.rotation)*30;
		this.bullet.y = this.y + Math.sin(this.gun.rotation)*30;
		this.bullet.rotation = this.gun.rotation;
		this.bullet.body.velocity.x = 350*Math.cos(this.gun.rotation);
		this.bullet.body.velocity.y = 350*Math.sin(this.gun.rotation);
	}

	destroy() {
		game.time.events.remove(this.fireLoop);
		super.destroy();
	}
}