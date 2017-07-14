import game from '../jetpack';

export default class Exploder extends Phaser.Particles.Arcade.Emitter {
	constructor() {
		super(game);
		this.gravity = 800;
		this.minParticleSpeed.set(-300, -200);
		this.maxParticleSpeed.set(300, -600);

		this.smoke = game.add.emitter();
		this.smoke.gravity = -200;
		this.smoke.makeParticles('smoke');
		this.smoke.setScale(0.5, 2, 0.5, 2, 1000);
		this.smoke.setAlpha(1, 0, 2000);
	}

	explodeEnemy(x, y, inverted) {
		this.x = x;
		this.y = y;
		this.smoke.x = x;
		this.smoke.y = y;
		if (inverted) {
			this.makeParticles('shards', [3, 4, 5]);
		} else {
			this.makeParticles('shards', [0, 1, 2]);
		}
		this.start(true, 2000, null, 5);
		this.smoke.start(true, 2000, null, 5);
	}

	explodePlayer(x, y) {
		this.x = x;
		this.y = y;
		this.smoke.x = x;
		this.smoke.y = y;
		this.makeParticles('shards', [6, 7, 8], 3);
		this.start(true, 2000, null, 5);
		this.smoke.start(true, 2000, null, 5);
	}
}