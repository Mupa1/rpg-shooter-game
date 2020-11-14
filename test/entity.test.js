import Phaser from 'phaser';
import Entity from '../src/js/Entity';

test('Entity should be a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Entity).toBeSubclassOf(Phaser.GameObjects.Sprite);
});
