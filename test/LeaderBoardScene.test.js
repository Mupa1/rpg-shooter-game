import Phaser from 'phaser';
import LeaderBoardScene from '../src/Scenes/LeaderBoardScene';

test('LeaderBoardScene should be a subclass of Phaser.Scene', () => {
  expect(LeaderBoardScene).toBeSubclassOf(Phaser.Scene);
});
