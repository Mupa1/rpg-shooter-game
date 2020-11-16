import Entity from './Entity';

export default class BeastLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'beastLaser');
    this.body.velocity.y = 200;
  }
}