import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet('logo', '../src/assets/destroyed.png', {
      frameWidth: 142,
      frameHeight: 142,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}
