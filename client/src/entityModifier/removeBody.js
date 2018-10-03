import { World } from 'matter-js';
import getPhysicsEngine from '../physics/getPhysicsEngine';

// TODO: Take entity as argument
export default (body) => {
  const engine = getPhysicsEngine();
  World.remove(engine.world, [body]);
};
