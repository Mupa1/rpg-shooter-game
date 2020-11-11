import Phaser from 'phaser';

import Player from '../js/Player';
import Beast from '../js/Beast';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.width = this.game.config.width;
    this.height = this.game.config.height;
  }

  movePlayerShip() {
    if (this.cursorKeys.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursorKeys.right.isDown) {
      this.player.moveRight();
    }
    if (this.cursorKeys.up.isDown) {
      this.player.moveUp();
    } else if (this.cursorKeys.down.isDown) {
      this.player.moveDown();
    }
  }

  create() {
    this.add.image(400, 300, 'background1');

    this.anims.create({
      key: 'playerShip',
      frames: this.anims.generateFrameNumbers('playerShip'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beast',
      frames: this.anims.generateFrameNumbers('beast'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemyShip',
      frames: this.anims.generateFrameNumbers('enemyShip'),
      frameRate: 20,
      repeat: -1,
    });

    this.player = new Player(
      this,
      (this.width / 2) - 8,
      this.height - 64,
      'playerShip',
    );
    this.player.setScale(2);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 100,
      callback() {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new Beast(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();
    this.movePlayerShip();
  }
}
