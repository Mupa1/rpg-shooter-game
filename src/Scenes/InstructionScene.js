import Phaser from 'phaser';

import Text from '../js/text';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.title = Text.text(
      this,
      width,
      120,
      'HOW TO PLAY',
      48,
    );

    this.instruction1 = Text.text(
      this,
      width,
      200,
      'Move the jet up/down, left/right using arrow keys',
      24,
    );

    this.instruction2 = Text.text(
      this,
      width,
      250,
      'Use the spacebar to shoot desert beasts',
      24,
    );

    this.instruction3 = Text.text(
      this,
      width,
      300,
      'Ready to Play?',
      30,
    );

    this.gameButton = this.add.sprite(width - 100, 400, 'blueButton1').setInteractive();
    this.gameText = Text.text(this, 0, 0, 'Play', 32);
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.backButton = this.add.sprite(width + 100, 400, 'blueButton1').setInteractive();
    this.backText = Text.text(this, 0, 0, 'Back', 32);
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
