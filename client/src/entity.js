import { World } from 'matter-js';

import * as Core from './core';
import * as Render from './render';

/* eslint-disable no-param-reassign */

export function create(id) {
  if (!id) throw new Error('Entity.create(id) takes a unique id as an argument');
  const behaviours = {};
  const entity = {
    id,
    type: '',
    behaviours,
    run: (entity) => {
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
  const animation = Render.getAnimation(filenames, animationSpeed);
  Render.add(animation);
  entity.animation = animation;
  // animation.play();
  return animation;
}

export function addBody(entity, body) {
  World.add(Core.engine.world, [body]);
  body.entity = entity;
  entity.body = body;
  return body;
}

export function removeBody(body) {
  World.remove(Core.engine.world, [body]);
}

export function destroy(entity) {
  Core.remove(entity);
  const { sprite, animation, body } = entity;
  if (sprite) Render.remove(sprite);
  if (animation) Render.remove(animation);
  if (body) removeBody(body);
}
