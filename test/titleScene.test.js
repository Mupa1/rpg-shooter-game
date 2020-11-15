import Phaser from 'phaser';
import TitleScene from '../src/Scenes/TitleScene';

test('Titlescene should be a subclass of Phaser.Scene', () => {
  expect(TitleScene).toBeSubclassOf(Phaser.Scene);
});
