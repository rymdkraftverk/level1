import MainLoop from 'mainloop.js';
import { Engine } from 'matter-js';
import * as Render from './Render';
import * as InternalEntity from './Entity';

let engine;
let entities = [];

function update(delta) {
  try {
    if (engine) {
      Engine.update(engine, delta);
    }
    entities.forEach((e) => { runEntity(e, delta); });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`level1 crashed with the following error: ${error.stack}`);
    stop();
  }
}

function runEntity(e, delta) {
  runBehaviors(e);

  if (e.hasBody) {
    syncEntityBodyPosition(e);
  }

  if (e.asset && e.asset.type === InternalEntity.assetTypes.PARTICLES) {
    e.asset.update(delta * 0.001);
  }
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
  // TODO: Make the show hitboxes check here instead
  const { body, hasBody } = entity;
  if (hasBody) {
    Render.displayBodyBounds(body);
  } else if (entity.asset
    && entity.asset.type !== InternalEntity.assetTypes.SOUND
    && entity.asset.width > 0
    && entity.asset.height > 0) {
    Render.displayEntityBounds(entity);
  }
}

function syncEntityBodyPosition(entity) {
  entity.asset.x = entity.body.position.x;
  entity.asset.y = entity.body.position.y;
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
  if (!isPhysicsEnabled()) throw new Error('Physics not initialized. Set physics to true when calling l1.init');
  return engine;
}

export function resize(width, height) {
  Render.setRatio(Math.min(
    width / Render.getGameWidth(),
    height / Render.getGameHeight(),
  ));

  Render.getStage()
    .scale
    .set(Render.getRatio());

  Render.getRenderer()
    .resize(
      Render.getGameWidth() * Render.getRatio(),
      Render.getGameHeight() * Render.getRatio(),
    );

  /*
    The following code is needed to counteract the scale change on the whole canvas since
    texts get distorted by PIXI when you try to change their scale.
    Texts instead change size by setting their fontSize.
  */
  getEntities()
    .forEach((e) => {
      if (e.originalSize) {
        e.asset.style.fontSize = e.originalSize * Render.getRatio();
        e.asset.scale.set(1 / Render.getRatio());
      }
    });
}
