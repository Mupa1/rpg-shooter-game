import Phaser from 'phaser';

import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import destroyed from '../assets/destroyed.png';
import battleTheme from '../assets/battleTheme.mp3';
import background1 from '../assets/background1.png';
import beastLaser from '../assets/beastLaser.png';
import playerJet from '../assets/jet.png';
import beast from '../assets/beast.png';
import playerLaser from '../assets/playerLaser.png';
import explosion from '../assets/explosion.png';
import explodeSound0 from '../assets/explodeSound0.wav';
import explodeSound1 from '../assets/explodeSound1.wav';
import laserSound from '../assets/laserSound.wav';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('phaserLogo', destroyed);
    this.load.audio('bgMusic', [battleTheme]);

    this.load.image('background1', background1);
    this.load.image('beastLaser', beastLaser);

    this.load.spritesheet('playerJet', playerJet, {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet('beast', beast, {
      frameWidth: 72,
      frameHeight: 64,
    });

    this.load.spritesheet('playerLaser', playerLaser, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('explosion', explosion, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio('explodeSound0', explodeSound0);
    this.load.audio('explodeSound1', explodeSound1);
    this.load.audio('laserSound', laserSound);

    this.logo = this.add
      .sprite((this.scale.width * 0.5), (this.scale.height * 0.5) * 0.5, 'logo', 0)
      .setScale(0.7, 0.7);

    if (!this.anims.get('logo')) {
      this.anims.create({
        key: 'logo',
        frames: this.anims.generateFrameNames('logo'),
        frameRate: 7.5,
        repeat: -1,
      });
    }

    this.logo.anims.play('logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
