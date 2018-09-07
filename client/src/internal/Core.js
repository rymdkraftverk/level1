import MainLoop from 'mainloop.js';
import { Engine } from 'matter-js';
import * as Render from './Render';
import * as InternalEntity from './Entity';

let engine;
let entities = [];

const rootEntity = {
  id: 'level1_internal_root_entity',
  x: 0,
  y: 0,
  children: [],
  parent: null,
};

function update(delta) {
  try {
    if (engine) {
      Engine.update(engine, delta);
    }
    rootEntity.children.forEach((e) => { runEntity(e, delta); });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`level1 crashed with the following error: ${error.stack}`);
    stop();
  }
}

function runEntity(e, delta) {
  runBehaviors(e);
  syncEntityAssetPosition(e);
  if (e.asset && e.asset.type === InternalEntity.assetTypes.PARTICLES) {
    e.asset.update(delta * 0.001);
  }
  e.children.forEach((child) => { runEntity(child, delta); });
}

function runBehaviors(entity) {
  const { behaviors } = entity;

  behaviors
    .forEach((
      behavior,
    ) => {
      const {
        init, update: updateBehavior, data, initHasBeenCalled,
      } = behavior;

      if (!initHasBeenCalled) {
        init({ data, entity, behavior });
      }

      updateBehavior({ behavior, entity, data });
    });

  // Display hitboxes
  const { body, hasBody } = entity;
  if (hasBody) {
    Render.displayBodyBounds(body);
  } else if (entity.width > 0 && entity.height > 0) {
    Render.displayEntityBounds(entity);
  }
}

function syncEntityAssetPosition(entity) {
  if (entity.hasBody) {
    entity.x = entity.body.position.x;
    entity.y = entity.body.position.y;
  }

  if (entity.asset && entity.asset.position) {
    entity.asset.position.set(InternalEntity.getX(entity), InternalEntity.getY(entity));
  }
}

export function getRootEntity() {
  return rootEntity;
}

export function initMainLoop() {
  MainLoop
    .setUpdate(update)
    .setDraw(Render.draw)
    .setMaxAllowedFPS(60);
}

export function getFPS() {
  return MainLoop.getFPS();
}

export function start() {
  MainLoop.start();
}

export function stop() {
  MainLoop.stop();
}

export function isRunning() {
  return MainLoop.isRunning();
}

export function getEntities() {
  return entities;
}

export function getById(id) {
  return entities.find(e => e.id === id);
}

export function get(id) {
  return getById(id);
}

export function getByType(type) {
  return entities.filter(e => e.types.includes(type));
}

export function exists(id) {
  return entities.some(e => e.id === id);
}

export function addEntity(entity) {
  const defaultBody = {
    entity,
  };
  entity.body = defaultBody;

  entity.parent.children = entity.parent.children.concat(entity);

  entities = entities.concat(entity);

  return entity;
}

export function remove(entity) {
  const { id } = entity;
  entities = entities.filter(e => e.id !== id);
  return entity;
}

export function removeAll() {
  entities.forEach(e => remove(e));
}

export function initPhysics() {
  engine = Engine.create();
  engine.world.gravity.y = 0;
}

export function isPhysicsEnabled() {
  return !!engine;
}

export function getPhysicsEngine() {
  if (!isPhysicsEnabled()) throw new Error('Physics not initialized. Set physics to true when calling Game.init');
  return engine;
}
