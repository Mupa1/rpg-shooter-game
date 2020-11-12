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

  addPlayerJet() {
    this.player = new Player(
      this,
      (this.width / 2) - 8,
      this.height - 64,
      'playerJet',
    );
    this.player.setScale(2);
  }

  movePlayerJet() {
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
    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }
  }

  spawnEnemyTimer() {
    this.time.addEvent({
      delay: 100,
      callback() {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) <= 2) {
          enemy = new Beast(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(8, 12) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  playerLaserEnemyCollision() {
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();
      }
    });
  }

  playerEnemyCollision() {
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
        && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });
  }

  enemyLaserPlayerCollision() {
    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
        && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  removePastScreenEnemies() {
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
  }

  removePastScreenEnemyLaser() {
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  removePastScreenPlayerLaser() {
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  addSoundEffects() {
    this.soundEffects = {
      explosions: [
        this.sound.add('explodeSound0'),
        this.sound.add('explodeSound1'),
      ],
      laser: this.sound.add('laserSound'),
    };
  }

  create() {
    this.add.image(400, 300, 'background1');
    this.anims.create({
      key: 'playerJet',
      frames: this.anims.generateFrameNumbers('playerJet'),
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
      key: 'enemyJet',
      frames: this.anims.generateFrameNumbers('enemyJet'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'playerLaser',
      frames: this.anims.generateFrameNumbers('playerLaser'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.addSoundEffects();
    this.addPlayerJet();

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.spawnEnemyTimer();
    this.playerLaserEnemyCollision();
    this.playerEnemyCollision();
    this.enemyLaserPlayerCollision();
  }

  update() {
    this.player.update();
    this.movePlayerJet();
    this.removePastScreenEnemies();
    this.removePastScreenEnemyLaser();
    this.removePastScreenPlayerLaser();
  }
}
