import MainLoop from 'mainloop.js';

// unaware if network is enabled or not
// unaware of renderer
// unaware of physics

// game loop
// game entities

let entities = [];

export function createCore(){
  MainLoop
  .setUpdate(update)
  .setMaxAllowedFPS(60);
  // .setDraw(draw);
}

export function start(){
  MainLoop.start();
}

export function setDraw(draw) {
  MainLoop.setDraw(draw);
}

export function stop(){
  MainLoop.stop();
}

export function getEntities(){
  return entities;
}

export function get(id) {
  return entities.find(e => e.id === id);
}

export function add(entity) {
  entities = entities.concat(entity);
}

export function remove(entity) {
  const { id } = entity;
  entities = entities.filter(e => e.id !== id);
  return entity;
}

export function removeAll(){
  entities.forEach(e => remove(e.id));
}

function update() {
  entities.forEach(e => e.run(e));
}
