import game from '../jetpack';

export default class LoadState extends Phaser.State {
	preload() {
		game.load.spritesheet('player', 'img/player.png', 32, 43);
		game.load.spritesheet('background', 'img/bg.png', 315, 1000);
		game.load.spritesheet('hoverer', 'img/hoverer.png', 48, 60);
		game.load.spritesheet('gun', 'img/gun.png', 35, 20);
		game.load.spritesheet('blade', 'img/blade.png', 34, 87);
		game.load.spritesheet('eye', 'img/eye.png', 20, 20);
		game.load.spritesheet('spark', 'img/spark.png', 35, 35);
		game.load.spritesheet('shards', 'img/shards.png', 24, 24);
		game.load.spritesheet('bullet', 'img/bullet.png', 15, 10);
		game.load.spritesheet('arrows', 'img/arrows.png', 76, 76);
		game.load.image('smoke', 'img/smoke.png', 35, 35);
		game.load.image('triangle', 'img/triangle.png', 50, 50);
		game.load.image('fire', 'img/fire.png');
		game.load.image('display', 'img/display.png');
	}
	create() {
		console.log(' _ _ _ _ _ \n|  _|  _| |\n| |_  |   |\n|_ _|_|_ _|');
		game.state.start('menu');
	}
}