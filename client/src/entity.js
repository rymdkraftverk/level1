import { World, Events } from 'matter-js';

import * as Core from './core-internal';
import * as Render from './render-internal';
import syncSpriteWithBodyBehavior from './behaviours/syncSpriteWithBody';

export function create(id) {
  if (!id) throw new Error('Entity.create(id) takes a unique id as an argument');
  const behaviors = {};
  const entity = {
    id,
    type: '',
    sprite: null,
    hasBody: false,
    behaviors,
    run: (entity) => { // eslint-disable-line no-shadow
      Object.keys(behaviors).forEach((b) => {
        const behavior = behaviors[b];
        if (behavior.init) {
          behavior.init(behavior, entity);
          delete behavior.init;
        }
        if (!behavior.run) throw new Error(`Behaviour ${b} on entity ${id} has no run function`);
        behavior.run(behavior, entity);
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

export function addAnimation(entity, filenames, animationSpeed = 0.05, options) {
  const sprite = Render.getAnimation(filenames, animationSpeed);

  if (options) {
    const { zIndex } = options;
    sprite.zIndex = zIndex || 0;
  }

  Render.add(sprite);
  sprite.play();
  entity.sprite = sprite;
  return sprite;
}

export function addBody(entity, body, syncSpriteWithBody = true) {
  const engine = Core.getPhysicsEngine();
  World.add(engine.world, [body]);
  body.entity = entity;
  entity.body = body;
  entity.hasBody = true;
  if (syncSpriteWithBody) {
    entity.behaviors.syncSpriteWithBody = syncSpriteWithBodyBehavior();
  }
  return body;
}

export function removeBody(body) {
  const engine = Core.getPhysicsEngine();
  World.remove(engine.world, [body]);
}

export function destroy(entity) {
  Core.remove(entity);
  const { sprite, animation, body, hasBody } = entity;
  if (sprite) Render.remove(sprite);
  if (animation) Render.remove(animation);
  if (hasBody) removeBody(body);
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
  const engine = Core.getPhysicsEngine();
  const getType = body => body.entity && body.entity.type;
  const collisionCheck = (typeToCheck, otherType) => typeToCheck === entityType && otherTypes.includes(otherType);
  Events.on(engine, collisionType, ({ pairs }) => {
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


export function getAll() {
  return Core.getEntities();
}

export function getById(id) {
  return Core.getById(id);
}

export function get(id) {
  return Core.getById(id);
}

export function getByType(type) {
  return Core.getByType(type);
}

// Sprite collision
export function isColliding(entity, otherEntity) {
  if (Core.isPhysicsEnabled()) {
    console.warn('Entitiy.isColliding is for sprite collision detection. If using physics use Entity.addCollision instead');
  }

  const { sprite } = entity;
  const { sprite: otherSprite } = otherEntity;
  // hit will determine whether there's a collision
  let hit = false;

  // Find the half-widths and half-heights of each sprite
  sprite.halfWidth = (sprite.width / 2);
  sprite.halfHeight = (sprite.height / 2);
  otherSprite.halfWidth = (otherSprite.width / 2);
  otherSprite.halfHeight = (otherSprite.height / 2);

  // Find the center points of each sprite
  sprite.centerX = sprite.x + sprite.halfWidth;
  sprite.centerY = sprite.y + sprite.halfHeight;
  otherSprite.centerX = otherSprite.x + otherSprite.halfWidth;
  otherSprite.centerY = otherSprite.y + otherSprite.halfHeight;

  // Calculate the distance vector between the sprites
  const vx = sprite.centerX - otherSprite.centerX;
  const vy = sprite.centerY - otherSprite.centerY;

  // Figure out the combined half-widths and half-heights
  const combinedHalfWidths = sprite.halfWidth + otherSprite.halfWidth;
  const combinedHalfHeights = sprite.halfHeight + otherSprite.halfHeight;

  // Check for a collision on the x and y axis
  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true;
  }

  return hit;
}
