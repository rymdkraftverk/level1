import MainLoop from 'mainloop.js';
import { Engine } from 'matter-js';
import * as Render from './render';

let engine;
let entities = [];

function update(delta) {
  try {
    if (engine) {
      Engine.update(engine, delta);
    }
    entities.forEach(e => {
      runBehaviors(e);
      e.emitters.forEach((emitter) => {
        emitter.update(delta * 0.001);
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`level1 crashed with the following error: ${error.stack}`);
    stop();
  }
}

function runBehaviors(entity) {
  const { behaviors, id } = entity;

  Object
    .entries(behaviors)
    .forEach(([behaviorName, behavior]) => {
      const { init, run } = behavior;

      if (init) {
        init(behavior, entity);
        delete behavior.init;
      }

      if (!run) {
        throw new Error(`Behavior "${behaviorName}" on entity "${id}" has no run function`);
      }

      run(behavior, entity);
    });

  // Display hitboxes
  const { body, hasBody, sprite } = entity;
  if (hasBody) {
    Render.displayBodyBounds(body);
  } else if (sprite) {
    Render.displaySpriteBounds(sprite);
  }
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

export function add(entity) {
  entities = entities.concat(entity);
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
