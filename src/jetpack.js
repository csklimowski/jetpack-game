import LoadState from './states/load';
import MenuState from './states/menu';
import MainState from './states/main';
import ResultsState from './states/results';
import CreditsState from './states/credits';

var game = new Phaser.Game(630, 1120, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('main', MainState);
game.state.add('menu', MenuState);
game.state.add('credits', CreditsState);
game.state.add('results', ResultsState);

game.state.start('load');

export default game;