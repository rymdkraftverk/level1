import { World } from 'matter-js';
import getPhysicsEngine from '../physics/getPhysicsEngine';

export default (body) => {
  const engine = getPhysicsEngine();
  World.remove(engine.world, [body]);
};
