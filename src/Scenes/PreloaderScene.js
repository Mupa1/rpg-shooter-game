import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.load.image('blueButton1', '../src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', '../src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', '../src/assets/destroyed.png');
    this.load.image('box', '../src/assets/ui/grey_box.png');
    this.load.image('checkedBox', '../src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);

    this.load.image('background1', '../src/assets/background1.png');
    this.load.image('beastLaser', '../src/assets/beastLaser.png');

    this.load.spritesheet('playerJet', '../src/assets/jet.png', {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet('beast', '../src/assets/beast.png', {
      frameWidth: 72,
      frameHeight: 64,
    });

    this.load.spritesheet('enemyJet', '../src/assets/enemyJet.png', {
      frameWidth: 32,
      frameHeight: 16,
    });

    this.load.spritesheet('playerLaser', '../src/assets/playerLaser.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('explosion', '../src/assets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio('explodeSound0', '../src/assets/explodeSound0.wav');
    this.load.audio('explodeSound1', '../src/assets/explodeSound1.wav');
    this.load.audio('laserSound', '../src/assets/laserSound.wav');

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
