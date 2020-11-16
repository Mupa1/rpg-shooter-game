import Phaser from 'phaser';

import './css/styles.css';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import InstructionScene from './Scenes/InstructionScene';
import CreditsScene from './Scenes/CreditsScene';
import GameOverScene from './Scenes/GameOverScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Instructions', InstructionScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
