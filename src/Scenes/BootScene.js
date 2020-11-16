import Phaser from 'phaser';
import destroyed from '../assets/destroyed.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet('logo', destroyed, {
      frameWidth: 142,
      frameHeight: 142,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}
