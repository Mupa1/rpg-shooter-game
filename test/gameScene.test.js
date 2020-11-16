import Phaser from 'phaser';
import GameScene from '../src/Scenes/GameScene';

test('GameScene should be a subclass of Phaser.Scene', () => {
  expect(GameScene).toBeSubclassOf(Phaser.Scene);
});
