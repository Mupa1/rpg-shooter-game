import Phaser from 'phaser';

import LocalStorage from '../js/LocalStorage';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.width = this.game.config.width * 0.5;

    this.title = this.add.text(this.width, 120, 'Game Over', {
      fontSize: 48,
      fontStyle: 'bold',
    });
    this.title.setOrigin(0.5);

    const score = LocalStorage.getScoreLocalStorage();
    LocalStorage.clearLocalStorage();

    this.instruction1 = this.add.text(this.width, 200, `Your score is: ${score}`, {
      fontSize: 24,
    });
    this.instruction1.setOrigin(0.5);

    this.gameButton = this.add.sprite(this.width - 100, 400, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Play Again', { fontSize: '26px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.backButton = this.add.sprite(this.width + 100, 400, 'blueButton1').setInteractive();

    this.backText = this.add.text(0, 0, 'LeaderBoard', { fontSize: '26px', fill: '#fff' });
    this.centerButtonText(this.backText, this.backButton);

    this.backButton.on('pointerdown', () => {
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
