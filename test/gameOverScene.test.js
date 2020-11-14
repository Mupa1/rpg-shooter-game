import Phaser from 'phaser';
import GameOverScene from '../src/Scenes/GameOverScene';

test('GameOverScene should be a subclass of Phaser.Scene', () => {
  expect(GameOverScene).toBeSubclassOf(Phaser.Scene);
});
