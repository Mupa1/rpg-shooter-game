import Entity from '../src/js/Entity';
import Beast from '../src/js/Beast';

test('Beast should be a subclass of Entity', () => {
  expect(Beast).toBeSubclassOf(Entity);
});
