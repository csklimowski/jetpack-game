import game from '../jetpack';
import Exploder from '../objects/exploder';
import Gunner from '../objects/gunner';
import Hoverer from '../objects/hoverer';
import Player from '../objects/player';
import Slicer from '../objects/slicer';
import ComboText from '../objects/combotext';

export default class MainState extends Phaser.State {
	create() {
		game.world.setBounds(0, 0, 315, 1000);
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = game.add.image(0, 0, 'background');
		this.graphics = game.add.graphics(0, 0);
		this.exploder = new Exploder();
		
		this.player = new Player(150, 700);
		this.enemies = game.add.group();
		this.shakeProgress = 20;

		this.multiplier = 0;
		this.comboText = new ComboText();
		this.lastWasInverted = false;
		this.noBotsHit = true;

		game.score = 0;
		this.visibleScore = 0;
		this.scoreDisplay = game.add.text(5, 0, '00000', {
			font: "15px monospace",
			fill: "white"
		});
		this.lifebar = game.add.sprite(280, 5, 'lifebar');

		this.display = game.add.sprite(0, 540, 'display');
		game.add.tween(this.display).to({x: 315}, 500).start();

		game.time.events.add(1000, function() {
			game.sfx.floodlights.play();
			this.background.frame = 1;
			this.tutorialArrows = {
				left: game.add.sprite(25, 480, 'arrows', 0),
				down: game.add.sprite(120, 480, 'arrows', 1),
				right: game.add.sprite(215, 480, 'arrows', 2)
			};

			game.input.keyboard.addKey(Phaser.KeyCode.LEFT).onDown.addOnce(function() {
				game.add.tween(this.tutorialArrows.left).to({alpha: 0}, 1000).start();
			}, this);
			game.input.keyboard.addKey(Phaser.KeyCode.DOWN).onDown.addOnce(function() {
				game.add.tween(this.tutorialArrows.down).to({alpha: 0}, 1000).start();
				this.awaitingNewWave = false;
			}, this);
			game.input.keyboard.addKey(Phaser.KeyCode.RIGHT).onDown.addOnce(function() {
				game.add.tween(this.tutorialArrows.right).to({alpha: 0}, 1000).start();
			}, this);
		}, this);

		this.level = 10;
		this.awaitingNewWave = true;
	}

	update() {
		game.camera.y = this.player.body.y - 200;

		if (this.visibleScore < game.score) {
			this.visibleScore = Math.min(this.visibleScore + 0.3, game.score);
		} else {
			game.sfx.beep.stop();
		}
		this.scoreDisplay.y = game.camera.y + 5;
		this.scoreDisplay.text = Math.floor(this.visibleScore);
		this.lifebar.y = game.camera.y + 5;

		if (this.enemies.length == 0 && !this.awaitingNewWave) {
			game.sfx.helicopter.stop();
			game.time.events.add(2000, this.newWave, this);
			this.awaitingNewWave = true;
		}

		this.graphics.clear();
		this.enemies.forEach(this.updateEnemy, this);

		this.graphics.lineStyle(2, 0x000000, 1);
		this.graphics.moveTo(0, 900);
		if (this.player.body.y >= 860 && !this.player.dead) {
			this.graphics.lineTo(this.player.body.x + 20, this.player.body.y + 40);
		} else if (this.player.ly >= 860) {
			if (this.noBotsHit) {
				this.multiplier = 0;
			} else {
				this.noBotsHit = true;
			}
		}
		this.graphics.lineTo(315, 900);

		game.camera.y = game.camera.y + Math.max(0, 20 - this.shakeProgress) * Math.sin(this.shakeProgress);
		this.shakeProgress += 1.25;
	}

	updateEnemy(enemy) {
		enemy.eye.rotation = game.physics.arcade.angleBetween(enemy, this.player);
		if (!this.player.dead) {
			game.physics.arcade.overlap(this.player, enemy.robody, this.playerHits, null, this);
		}
		if (enemy.enemyType == 2) {
			if (!this.player.invincible && !this.player.dead) {
				game.physics.arcade.overlap(this.player, enemy.blade, this.takeDamage, null, this);
			}
		}
		if (enemy.enemyType == 3) {
			enemy.gun.rotation = game.physics.arcade.angleBetween(enemy, this.player);
			if (!this.player.invincible && !this.player.dead) {
				game.physics.arcade.overlap(this.player, enemy.bullet, this.takeDamage, null, this);
			}
		}
	}

	playerHits(player, body) {
		if (body.parent.inverted) {
			if (player.lvy < -300) {
				if (body.parent.enemyType == 3) {
					game.time.events.remove(body.parent.fireLoop);
				}
				game.sfx.hit.play();
				game.sfx.robot[Math.floor(Math.random()*3)].play();
				player.body.velocity.y = 0;
				body.parent.eye.frame = 1;
				body.parent.dead = true;
				game.time.events.add(500, this.robotExplodes, this, body);
			} else {
				if (player.lvy > 0 && player.y < body.parent.y) {
					this.takeDamage();
				}
				game.physics.arcade.collide(player, body);
			}
		} else {
			if (player.lvy > 300) {
				if (body.parent.enemyType == 3) {
					game.time.events.remove(body.parent.fireLoop);
				}
				game.sfx.hit.play();
				game.sfx.robot[Math.floor(Math.random()*3)].play();
				player.body.velocity.y *= -0.4;
				body.parent.eye.frame = 1;
				body.parent.dead = true;
				game.time.events.add(500, this.robotExplodes, this, body);
			} else {
				if (player.lvy < 50 && player.y > body.parent.y) {
					this.takeDamage();
				}
				game.physics.arcade.collide(player, body);
			}
		}
	}

	takeDamage() {
		if (!this.player.invincible) {
			this.player.health--;
			this.lifebar.frame++;
			if (this.player.health <= 0) {
				game.sfx.explosion.play();
				this.exploder.explodePlayer(this.player.x, this.player.y);
				this.shakeProgress = 0;
				this.player.frame = 3;
				this.player.dead = true;
				this.player.triangle.destroy();
				game.time.events.add(3000, game.state.start, game.state, 'results');
			} else {
				game.sfx.hurt.play();
				this.player.invincible = true;
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
				this.player.alpha = 0.5;
				game.time.events.add(1000, this.player.vincible, this.player);
			}
		}
	}

	robotExplodes(robody) {
		if (robody.parent) {
			game.sfx.explosion.play();
			game.sfx.beep.play();
			this.shakeProgress = 0;
			this.exploder.explodeEnemy(robody.parent.x, robody.parent.y, robody.parent.inverted);
			this.player.body.velocity.y += 800*Math.sin(game.physics.arcade.angleBetween(robody.parent, this.player));
			this.player.body.velocity.x += 1200*Math.cos(game.physics.arcade.angleBetween(robody.parent, this.player));

			if (!this.noBotsHit || (robody.parent.inverted || this.lastWasInverted)) {
				this.multiplier++;
			} else {
				this.multiplier = 1;
			}
			if (this.multiplier >= 2) {
				this.comboText.appear(robody.parent.x, robody.parent.y, this.multiplier);
			}
			this.noBotsHit = false;
			this.lastWasInverted = robody.parent.inverted;

			if (robody.parent.enemyType == 1) {
				game.score += 10 * this.multiplier;
			} else if (robody.parent.enemyType == 2) {
				game.score += 20 * this.multiplier;
			} else if (robody.parent.enemyType == 3) {
				game.score += 40 * this.multiplier;
			}
			robody.parent.destroy();
		}
	}

	newWave() {
		var pointsLeft = this.level;
		var heights = [350, 450, 550, 650, 750];
		var positions = [30, 90, 157, 225, 285];

		while (pointsLeft > 0) {
			var x = positions.splice(Math.floor(Math.random() * positions.length), 1)[0];
			var y = heights.splice(Math.floor(Math.random() * heights.length), 1)[0];
			var enemyChoice = Math.floor(Math.random() * Math.min(pointsLeft, 6)) + 2;
			var newEnemy;
	
			if (enemyChoice == 2) {
				newEnemy = new Hoverer(x, y, false, Math.random() > 0.5 ? true : false);
			} else if (enemyChoice == 3) {
				newEnemy = new Hoverer(x, y, true, Math.random() > 0.5 ? true : false);
			} else if (enemyChoice == 4) {
				newEnemy = new Slicer(x, y, false, Math.random() > 0.5 ? true : false);
			} else if (enemyChoice == 5) {
				newEnemy = new Slicer(x, y, true, Math.random() > 0.5 ? true : false);
			} else if (enemyChoice == 6) {
				newEnemy = new Gunner(x, y, false, Math.random() > 0.5 ? true : false);
			} else if (enemyChoice == 7) {
				newEnemy = new Gunner(x, y, true, Math.random() > 0.5 ? true : false);
			}

			this.enemies.add(newEnemy);
			pointsLeft -= enemyChoice;
			if (heights.length <= 0) break;
		}
		game.sfx.helicopter.play();
		this.awaitingNewWave = false;
		this.level++;
	}
}