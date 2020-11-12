import Phaser from 'phaser';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    this.width = this.game.config.width * 0.5;

    this.title = this.add.text(this.width, 120, 'HOW TO PLAY', {
      fontSize: 48,
      fontStyle: 'bold',
    });
    this.title.setOrigin(0.5);

    this.instruction1 = this.add.text(this.width, 200, 'Move the jet up/down, left/right using arrow keys', {
      fontSize: 24,
    });
    this.instruction1.setOrigin(0.5);

    this.instruction2 = this.add.text(this.width, 250, 'Use the spacebar to shoot desert beasts', {
      fontSize: 24,
    });
    this.instruction2.setOrigin(0.5);

    this.instruction3 = this.add.text(this.width, 300, 'Ready to Play?', {
      fontSize: 30,
    });
    this.instruction3.setOrigin(0.5);


    this.gameButton = this.add.sprite(this.width - 100, 400, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.backButton = this.add.sprite(this.width + 100, 400, 'blueButton1').setInteractive();

    this.backText = this.add.text(0, 0, 'Back', { fontSize: '32px', fill: '#fff' });
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
