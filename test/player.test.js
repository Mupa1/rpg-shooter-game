import Entity from '../src/js/Entity';
import Player from '../src/js/Player';

test('Player should be a subclass of Entity', () => {
  expect(Player).toBeSubclassOf(Entity);
});
