import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.width = this.game.config.width;
    this.height = this.game.config.height;
  }

  preload() {
    this.load.image('background1', '../src/assets/background1.png');
    this.load.spritesheet('playerShip', '../src/assets/ship.png', {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  addPlayerShip() {
    this.playerShip = this.physics.add.sprite(
      (this.width / 2) - 8,
      this.height - 64,
      'playerShip',
    );

    this.playerShip.setScale(2);
    this.playerShip.setCollideWorldBounds(true);
  }

  movePlayerShip() {
    this.playerShip.setVelocity(0);
    if (this.cursorKeys.left.isDown) {
      this.playerShip.setVelocityX(-200);
    } else if (this.cursorKeys.right.isDown) {
      this.playerShip.setVelocityX(200);
    }
    if (this.cursorKeys.up.isDown) {
      this.playerShip.setVelocityY(-200);
    } else if (this.cursorKeys.down.isDown) {
      this.playerShip.setVelocityY(200);
    }
  }

  create() {
    this.add.image(400, 300, 'background1');

    this.addPlayerShip();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.movePlayerShip();
  }
}
