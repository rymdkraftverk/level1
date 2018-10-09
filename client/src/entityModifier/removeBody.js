import { World } from 'matter-js';
import getPhysicsEngine from '../physics/getPhysicsEngine';

export default (entity) => {
  const engine = getPhysicsEngine();
  World.remove(engine.world, [entity.body]);
  entity.hasBody = false;
  entity.body = null;
};
