import game from '../jetpack';

export default class LoadState extends Phaser.State {
	preload() {
		game.add.text(315, 300, 'Loading...', { font: '30px monospace', fill: '#00ff00', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.windowConstraints.bottom = 'layout';
		game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
		
		game.load.spritesheet('player', 'img/player.png', 64, 86);
		game.load.spritesheet('background', 'img/bg.png', 630, 2000);
		game.load.spritesheet('hoverer', 'img/hoverer.png', 96, 120);
		game.load.spritesheet('gun', 'img/gun.png', 67, 40);
		game.load.spritesheet('blade', 'img/blade.png', 68, 175);
		game.load.spritesheet('eye', 'img/eye.png', 40, 40);
		game.load.spritesheet('shards', 'img/shards.png', 48, 48);
		game.load.spritesheet('bullet', 'img/bullet.png', 30, 20);
		game.load.spritesheet('arrows', 'img/arrows.png', 156, 156);
		game.load.spritesheet('lifebar', 'img/lifebar.png', 60, 36);
		game.load.spritesheet('triangle', 'img/triangle.png', 40, 40);
		game.load.spritesheet('combo', 'img/combo.png', 60, 40);
		game.load.spritesheet('pause', 'img/pause.png', 60, 60);
		game.load.spritesheet('begin', 'img/begin.png', 100, 40);
		game.load.spritesheet('credits', 'img/credits.png', 136, 40);
		game.load.spritesheet('sound-on', 'img/sound-on.png', 169, 40);
		game.load.spritesheet('sound-off', 'img/sound-off.png', 187, 40);
		game.load.spritesheet('sound-sfx-only', 'img/sound-sfx-only.png', 274, 40);
		game.load.spritesheet('return', 'img/return.png', 117, 40);

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
		game.load.audio('combo-1', 'sfx/combo-1.ogg');
		game.load.audio('combo-2', 'sfx/combo-2.ogg');
		game.load.audio('combo-3', 'sfx/combo-3.ogg');
		game.load.audio('combo-4', 'sfx/combo-4.ogg');
		
		game.load.bitmapFont('green', 'font/green.png', 'font/green.fnt');
		game.load.bitmapFont('white', 'font/white.png', 'font/white.fnt');
	}

	create() {
		game.sfx = {
			music: game.add.audio('music', 0.7, true),
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
			],
			combo: [
				game.add.audio('combo-1', 1, false),
				game.add.audio('combo-2', 1, false),
				game.add.audio('combo-3', 1, false),
				game.add.audio('combo-4', 1, false)
			]
		}

		if (localStorage.getItem('blast_down_data')) {
			let dataString = localStorage.getItem('blast_down_data');
			game.data = JSON.parse(dataString);
		} else {
			game.data = {
				highScore: 0,
				soundSetting: 0
			};
		}
		
		if (game.data.soundSetting == 0) {
			game.sfx.music.play();
		} else if (game.data.soundSetting == 1) {
			game.sound.mute = true;
		}
		game.world.setBounds(0, 0, 630, 2000);
		game.state.start('menu');
		
		console.log(' _ _ _ _ _ \n|  _|  _| |\n| |_  |   |\n|_ _|_|_ _|');
	}
}