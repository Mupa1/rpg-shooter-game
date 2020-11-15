import Phaser from 'phaser';

import Text from '../js/text';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.title = Text.text(
      this,
      width,
      120,
      'Principal Author',
      36,
    );

    Text.text(
      this,
      width,
      170,
      'Mupa M\'mbetsa: Software Developer',
      18,
    );

    Text.text(
      this,
      width,
      250,
      'Pixel Art, Music and Sounds',
      30,
    );

    Text.text(
      this,
      width,
      300,
      'Luis Zuno: PlayerShip, Background, Lasers and Bolts',
      18,
    );

    Text.text(
      this,
      width,
      350,
      'ZaPaper & Jordan Irwin: Flying Dragon Beast',
      18,
    );

    Text.text(
      this,
      width,
      400,
      'Alexandr Zhelanov: Background Music',
      18,
    );

    this.gameButton = this.add.sprite(width - 100, 500, 'blueButton1').setInteractive();
    this.gameText = Text.text(this, 0, 0, 'Play', 32);
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.backButton = this.add.sprite(width + 100, 500, 'blueButton1').setInteractive();
    this.backText = Text.text(this, 0, 0, 'Back', 32);
    this.centerButtonText(this.backText, this.backButton);
    this.backButton.on('pointerdown', () => {
      this.game.sound.stopAll();
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
