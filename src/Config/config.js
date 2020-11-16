import Phaser from 'phaser';

export default {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: 0x261F18,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
