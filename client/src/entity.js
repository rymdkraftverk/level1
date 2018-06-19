import { World, Events } from 'matter-js';

import * as Core from './internal/core';
import * as Render from './internal/render';
import * as Collision from './internal/collision';
import syncSpriteWithBodyBehavior from './behaviours/syncSpriteWithBody';

export function create(id) {
  if (Core.exists(id)) {
    throw new Error(`Entity.create(id) using an already existing id: ${id}`);
  }

  const behaviors = {};

  const entity = {
    id: id || null,
    types: [],
    emitters: [],
    sprite: null,
    text: null,
    hasBody: false,
    behaviors,
    run: (entity) => { // eslint-disable-line no-shadow
      Object.keys(behaviors).forEach((b) => {
        const behavior = behaviors[b];
        if (behavior.init) {
          behavior.init(behavior, entity);
          delete behavior.init;
        }
        if (!behavior.run) throw new Error(`Behavior ${b} on entity ${id} has no run function`);
        behavior.run(behavior, entity);
      });

      // Display hitboxes
      const { body, hasBody, sprite } = entity;
      if (hasBody) {
        Render.displayBodyBounds(body);
      } else if (sprite) {
        Render.displaySpriteBounds(sprite);
      }
    },
  };

  const defaultBody = {
    entity,
  };
  entity.body = defaultBody;

  Core.add(entity);
  return entity;
}

export function addType(entity, type) {
  entity.types = entity.types.concat(type);
}

export function removeType(entity, type) {
  entity.types = entity.types.filter((t) => t !== type);
}

/*
The following properties are required by PIXI Particles when it's created.
They will be ignored and then overwritten once emitEmitter is used.
*/
const defaultParticleEmitter = {
  lifetime: {
    min: 0,
    max: 0,
  },
  pos: {
    x: -999,
    y: -999,
  },
};

export function addEmitter(entity, { id, textures }) {
  if (!id || !textures) {
    throw new Error('Entity.addEmitter. Incomplete emitter options provided');
  }
  const emitter = Render.getEmitter(textures, {
    ...defaultParticleEmitter,
    emit: false,
    autoUpdate: false,
  });

  emitter.id = id;
  emitter.textures = textures;
  entity.emitters = entity.emitters.concat(emitter);
}

export function removeEmitter(entity, emitterId) {
  entity.emitters = entity.emitters.filter((e) => e !== emitterId);
}

export function getEmitter(entity, emitterId) {
  const emitter = entity.emitters.find((e) => e.id === emitterId);
  if (!emitter) {
    throw new Error(`Emitter not found for id: ${emitterId}`);
  }
  return emitter;
}

export function emitEmitter(entity, { id, config }) {
  const emitter = getEmitter(entity, id);
  emitter.init(emitter.textures, config);
}

function applyOptions(sprite, options) {
  if (options) {
    const { zIndex } = options;
    sprite.zIndex = zIndex || 0;
  }
}

/*
OPTIONS:
{
  zIndex: 999
}
*/
export function addSprite(entity, filename, options) {
  const sprite = Render.getSprite(filename);

  applyOptions(sprite, options);
  Render.add(sprite);
  entity.sprite = sprite;
  return sprite;
}

export function addEmptySprite(entity) {
  const sprite = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  entity.sprite = sprite;
  return sprite;
}

export function addAnimation(entity, filenames, animationSpeed = 0.05, options) {
  const sprite = Render.getAnimation(filenames, animationSpeed);

  applyOptions(sprite, options);
  Render.add(sprite);
  sprite.play();
  entity.sprite = sprite;
  return sprite;
}

export function addText(entity, text, textStyle, options) {
  const textObject = Render.getText(text, textStyle);
  applyOptions(textObject, options);
  Render.add(textObject);
  entity.text = textObject;
  return textObject;
}

export function addBody(entity, body, syncSpriteWithBody = true) {
  const engine = Core.getPhysicsEngine();
  World.add(engine.world, [body]);
  body.entity = entity;
  entity.body = body;
  entity.hasBody = true;
  if (syncSpriteWithBody && entity.sprite) {
    entity.behaviors.syncSpriteWithBody = syncSpriteWithBodyBehavior();
  }
  // Put the body in the middle of sprite
  if (entity.sprite) {
    entity.sprite.anchor.set(0.5);
  }
  return body;
}

export function removeBody(body) {
  const engine = Core.getPhysicsEngine();
  World.remove(engine.world, [body]);
}

export function destroy(entity) {
  if (typeof entity === 'string') {
    entity = Core.get(entity);
    if (!entity) {
      console.warn(`Tried to remove non-existant Entity: ${entity}`);
      return;
    }
  }

  Core.remove(entity);
  const {
    sprite, animation, text, body, hasBody,
  } = entity;
  if (sprite) Render.remove(sprite);
  if (animation) Render.remove(animation);
  if (text) Render.remove(text);
  if (hasBody) removeBody(body);
}

export function add(entity) {
  Core.add(entity);
  const { sprite } = entity;
  if (sprite) {
    Render.add(sprite);
  }
  return entity;
}

/*
  addCollision(entityType: string, otherTypes: array[string], onCollision: (bodyA, bodyB) => void, collisionType: string);
*/
export function addCollision(entityType, otherTypes, onCollision, collisionType = 'collisionActive') {
  const engine = Core.getPhysicsEngine();

  const getTypes = (body) => body.entity && body.entity.types;

  const collisionCheck = (typesA, typesB) => {
    const entityHasCollisionType = typesA.some((t) => t === entityType);
    const otherTypeShouldCollide = typesB.some((t) => otherTypes.includes(t));

    return entityHasCollisionType && otherTypeShouldCollide;
  };

  Events.on(engine, collisionType, ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      const typesA = getTypes(bodyA);
      const typesB = getTypes(bodyB);
      if (!typesA || !typesB) throw new Error('Trying to check collision on entities ');

      if (collisionCheck(typesA, typesB) || collisionCheck(typesB, typesA)) {
        onCollision(bodyA, bodyB);
      }
    });
  });
}

export function removeAllCollisions() {
  const engine = Core.getPhysicsEngine();
  Events.off(engine);
}

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
    console.warn('Entity.isColliding is for sprite collision detection. If using physics use Entity.addCollision instead');
  }
  return Collision.isColliding(entity, otherEntity);
}

export function overlappingRectangleArea(entity, otherEntity) {
  return Collision.overlappingRectangleArea(entity, otherEntity);
}
