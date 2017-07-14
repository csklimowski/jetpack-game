import game from '../jetpack';

export default class Spark extends Phaser.Sprite {
	constructor(y) {
		var pathNodes = [
			-15, y,
			300, y,
			300, y+15,
			15,  y+15,
			15,  y+30,
			330, y+30 
		];

		super(game, pathNodes[0], pathNodes[1], 'spark');
		game.add.existing(this);
		this.enemyType = 0;
		this.path = pathNodes;
		this.anchor.set(0.5);

		game.physics.arcade.enable(this);
		this.body.immovable = true;

		this.animations.add('zzz', [0, 1, 2, 3, 4, 5], 15, true);
		this.animations.play('zzz');

		var tween = game.add.tween(this);
		for (var i = 2; i < pathNodes.length; i += 2) {
			tween.to({
				x: pathNodes[i],
				y: pathNodes[i+1]
			}, 10*Math.sqrt(
				Math.pow(pathNodes[i-2] - pathNodes[i], 2) +
				Math.pow(pathNodes[i-1] - pathNodes[i+1], 2)
			));
		}
		tween.onComplete.add(this.remove, this);
		tween.start();
	}

	remove() {
		this.destroy();
	}
}