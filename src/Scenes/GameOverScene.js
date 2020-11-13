import Phaser from 'phaser';

import LocalStorage from '../js/LocalStorage';
import Helpers from '../js/Helpers';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.title = Helpers.text(
      this,
      width,
      120,
      'Game Over',
      48,
    );

    const score = LocalStorage.getScoreLocalStorage();
    LocalStorage.clearLocalStorage();

    this.score = Helpers.text(
      this,
      width,
      200,
      `Your score is: ${score}`,
      24,
    );

    this.gameButton = this.add.sprite(width - 100, 400, 'blueButton1').setInteractive();
    this.gameText = Helpers.text(this, 0, 0, 'Play Again', 26);
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.LeaderBoardButton = this.add.sprite(width + 100, 400, 'blueButton1').setInteractive();
    this.LeaderBoardText = Helpers.text(this, 0, 0, 'LeaderBoard', 26);
    this.centerButtonText(this.LeaderBoardText, this.LeaderBoardButton);
    this.LeaderBoardButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}