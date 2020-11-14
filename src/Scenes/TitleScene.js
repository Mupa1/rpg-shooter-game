import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.title = this.add.text(width, 120, 'SHOOTER GAME', {
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    const button = (scene, positionX, positionY, btnDetail, textSize) => {
      const button = scene.add.text(positionX, positionY, btnDetail, {
        fontSize: textSize,
      });
      button.setOrigin(0.5, 0);
      button.setInteractive();
      return button;
    };

    this.gameButton = button(
      this,
      width,
      200,
      'START',
      24,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.gameButton = button(
      this,
      width,
      250,
      'HOW TO PLAY',
      24,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Instructions');
    });

    this.gameButton = button(
      this,
      width,
      300,
      'CREDITS',
      24,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.gameButton = button(
      this,
      width,
      350,
      'LEADERBOARD',
      24,
    );

    this.gameButton.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
    });
  }
}
