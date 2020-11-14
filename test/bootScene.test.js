import Phaser from 'phaser';
import BootScene from '../src/Scenes/BootScene';

test('Bootscene should be a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});
