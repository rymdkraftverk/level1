import { World } from 'matter-js';
import getPhysicsEngine from '../physics/getPhysicsEngine';

export default (body, entity) => {
  const engine = getPhysicsEngine();

  const width = Math.abs(body.bounds.max.x - body.bounds.min.x);
  const height = Math.abs(body.bounds.max.y - body.bounds.min.y);

  entity.width = width;
  entity.height = height;

  // This is done to move the x and y coordinates of the body to its top left corner.
  // This will sync the position with pixi.
  body.position.x -= (width / 2);
  body.position.y -= (height / 2);
  body.positionPrev.x -= (width / 2);
  body.positionPrev.y -= (height / 2);

  World.add(engine.world, [body]);

  body.entity = entity;
  entity.body = body;
  entity.hasBody = true;

  return body;
};
