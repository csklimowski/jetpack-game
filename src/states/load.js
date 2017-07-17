import game from '../jetpack';

export default class LoadState extends Phaser.State {
	preload() {
		var loadingText = game.add.text(158, 150, 'Loading...', { font: '15px monospace', fill: '#00ff00', align: 'center'});
		game.load.spritesheet('player', 'img/player.png', 32, 43);
		game.load.spritesheet('background', 'img/bg.png', 315, 1000);
		game.load.spritesheet('hoverer', 'img/hoverer.png', 48, 60);
		game.load.spritesheet('gun', 'img/gun.png', 35, 20);
		game.load.spritesheet('blade', 'img/blade.png', 34, 87);
		game.load.spritesheet('eye', 'img/eye.png', 20, 20);
		game.load.spritesheet('shards', 'img/shards.png', 24, 24);
		game.load.spritesheet('bullet', 'img/bullet.png', 15, 10);
		game.load.spritesheet('arrows', 'img/arrows.png', 76, 76);
		game.load.spritesheet('lifebar', 'img/lifebar.png', 30, 18);
		game.load.spritesheet('triangle', 'img/triangle.png', 20, 20);
		game.load.image('smoke', 'img/smoke.png');
		game.load.image('fire', 'img/fire.png');
		game.load.image('display', 'img/display.png');
		game.load.audio('music', 'sfx/music.ogg');
		game.load.audio('jetpack', 'sfx/jetpack.ogg');
		game.load.audio('floodlights', 'sfx/floodlights.ogg');
		game.load.audio('helicopter', 'sfx/helicopter.ogg');
		game.load.audio('hit', 'sfx/hit.ogg');
		game.load.audio('hurt', 'sfx/hurt.ogg');
		game.load.audio('explosion', 'sfx/explosion.ogg');
		game.load.audio('gun', 'sfx/gun.ogg');
		game.load.audio('beep', 'sfx/beep.ogg');
		game.load.audio('robot-1', 'sfx/robot-1.ogg');
		game.load.audio('robot-2', 'sfx/robot-2.ogg');
		game.load.audio('robot-3', 'sfx/robot-3.ogg');
	}

	create() {
		game.sfx = {
			music: game.add.audio('music', 1, true),
			jetpack: game.add.audio('jetpack', 0.5, true),
			floodlights: game.add.audio('floodlights', 1, false),
			helicopter: game.add.audio('helicopter', 1.5, true),
			hit: game.add.audio('hit', 0.8, false),
			hurt: game.add.audio('hurt', 1, false),
			explosion: game.add.audio('explosion', 1, false),
			gun: game.add.audio('gun', 1, false),
			beep: game.add.audio('beep', 0.5, true),
			robot: [
				game.add.audio('robot-1', 0.5, false),
				game.add.audio('robot-2', 0.5, false),
				game.add.audio('robot-3', 0.5, false)
			]
		}
		console.log(' _ _ _ _ _ \n|  _|  _| |\n| |_  |   |\n|_ _|_|_ _|');
		game.state.start('menu');
	}
}