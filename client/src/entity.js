import { World, Events } from 'matter-js';

import * as Core from './core';
import * as Render from './render';

export function create(id) {
  if (!id) throw new Error('Entity.create(id) takes a unique id as an argument');
  const behaviours = {};
  const entity = {
    id,
    type: '',
    behaviours,
    run: (entity) => { // eslint-disable-line no-shadow
      Object.keys(behaviours).forEach((b) => {
        const behaviour = behaviours[b];
        if (behaviour.init) {
          behaviour.init(behaviour, entity);
          delete behaviour.init;
        }
        behaviour.run(behaviour, entity);
      });

      // Display hitboxes
      const { body } = entity;
      if (body.parts) Render.displayBounds(body);
    },
  };

  const defaultBody = {
    entity,
  };
  entity.body = defaultBody;

  Core.add(entity);
  return entity;
}
/*
OPTIONS:
{
  zIndex: 999
}
*/
export function addSprite(entity, filename, options) {
  const sprite = Render.getSprite(filename);

  if (options) {
    const { zIndex } = options;
    sprite.zIndex = zIndex || 0;
  }

  Render.add(sprite);
  entity.sprite = sprite;
  return sprite;
}

export function addAnimation(entity, filenames, animationSpeed) {
  const sprite = Render.getAnimation(filenames, animationSpeed);
  Render.add(sprite);
  sprite.play();
  entity.sprite = sprite;
  return sprite;
}

export function addBody(entity, body) {
  if (!Core.engine) throw new Error('Physics not initialized. Make sure to call Core.createPhysics()');
  World.add(Core.engine.world, [body]);
  body.entity = entity;
  entity.body = body;
  return body;
}

export function removeBody(body) {
  if (!Core.engine) throw new Error('Physics not initialized. Make sure to call Core.createPhysics()');
  World.remove(Core.engine.world, [body]);
}

export function destroy(entity) {
  Core.remove(entity);
  const { sprite, animation, body } = entity;
  if (sprite) Render.remove(sprite);
  if (animation) Render.remove(animation);
  if (body) removeBody(body);
}


/* 
  Collision types:
  collisionStart
  collisionEnd
*/

/*
  onCollision(entityType: string, otherTypes: array[string], onCollision: (bodyA, bodyB) => void, collisionType: string);
*/
export function addCollision(entityType, otherTypes, onCollision, collisionType = 'collisionActive') {
  const getType = body => body.entity && body.entity.type;
  const collisionCheck = (typeToCheck, otherType) => typeToCheck === entityType && otherTypes.contains(otherType);

  Events.on(Core.engine, collisionType, ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      const typeA = getType(bodyA);
      const typeB = getType(bodyB);
      if (!typeA || !typeB) return;

      if (collisionCheck(typeA, typeB) || collisionCheck(typeB, typeA)) {
        onCollision(bodyA, bodyB);
      }
    });
  });
}

// Remove collision?

// export function addCollisions(entityTypes, otherTypes, onCollision, collisionType = 'collisionActive') {
//   entityTypes.forEach((entityType) => addCollision(entityType, otherTypes, onCollision, collisionType));
// }
