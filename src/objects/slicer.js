import game from '../jetpack';
import Hoverer from './hoverer';

export default class Slicer extends Hoverer {
	constructor(x, y, inverted, moving) {
		super(x, y, inverted, moving);

        this.blade = game.add.sprite(0, 0, 'blade');
        this.blade.anchor.set(0.5, 1);

        if (this.inverted)
            this.blade.animations.add('spin', [5, 4, 3], 30, true);
        else
            this.blade.animations.add('spin', [2, 1, 0], 30, true);

        this.blade.angle = Math.random() * 360;
        this.blade.animations.play('spin');
		game.physics.arcade.enable(this.blade);
        this.blade.body.width = 30;
        this.blade.body.height = 30;

        this.add(this.blade);
		this.enemyType = 2;
	}

    update() {
        super.update();
        this.blade.angle += 1;
        this.blade.body.offset.x = Math.sin(this.blade.rotation)*70;
        this.blade.body.offset.y = -Math.cos(this.blade.rotation)*70 + 75;
    }
}