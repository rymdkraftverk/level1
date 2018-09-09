import { Events } from 'matter-js';
import * as Core from '../../internal/Core';

export default () => {
  const engine = Core.getPhysicsEngine();
  Events.off(engine);
};
