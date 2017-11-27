import * as Core from './core-internal';
import * as Render from './render-internal';

const defaultOptions = {
  physics: false,
  // eslint-disable-next-line no-undef 
  element: document.body,
};

export async function init(width, height, sprites, options) {
  // Replace default options with user specified ones 
  const { physics, element } = { ...defaultOptions, ...options };
  console.log('physics', physics);
  console.log('element', element);
  await Render.initRenderer(width, height, sprites, element);
  Core.initMainLoop();
  if (physics) Core.initPhysics();
}

export function start() {
  Core.start();
}

export function stop() {
  Core.stop();
}

export function getRenderer() {
  return Render.getRenderer();
}

export function getStage() {
  return Render.getStage();
}
