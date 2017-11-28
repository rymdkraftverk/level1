import MainLoop from 'mainloop.js';
import { Engine } from 'matter-js';

// eslint-disable-next-line import/no-mutable-exports
let engine;
let entities = [];

function update() {
  entities.forEach(e => e.run(e));
}

export function initMainLoop() {
  MainLoop
    .setUpdate(update)
    .setMaxAllowedFPS(60);
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
  return entities.filter(e => e.type === type);
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
  Engine.run(engine);
}

export function isPhysicsEnabled() {
  return !!engine;
}

export function getPhysicsEngine() {
  if (!isPhysicsEnabled()) throw new Error('Physics not initialized. Set physics to true when calling Game.init');
  return engine;
}
