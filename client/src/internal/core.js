import MainLoop from 'mainloop.js';
import { Engine } from 'matter-js';

// eslint-disable-next-line import/no-mutable-exports
let engine;
let entities = [];

function update(delta) {
  try {
    if (engine) {
      Engine.update(engine, delta);
    }
    entities.forEach(e => e.run(e));
  } catch (error) {
    console.error(`level1 crashed with the following error: ${error.stack}`);
    stop();
  }
}

export function initMainLoop() {
  MainLoop
    .setUpdate(update)
    .setMaxAllowedFPS(60);
}

export function getFPS() {
  return MainLoop.getFPS();
}

export function start() {
  MainLoop.start();
}

export function setDraw(draw) {
  MainLoop.setDraw(draw);
}

export function stop() {
  MainLoop.stop();
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
