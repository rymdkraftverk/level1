import * as Core from './core-internal';
import * as Render from './render-internal';
import * as Debug from './debug';

const defaultOptions = {
  physics: false,
  // eslint-disable-next-line no-undef 
  element: document.body,
  debug: false,
};

export async function init(width, height, sprites, options) {
  // Replace default options with user specified ones 
  const {
    physics,
    element,
    debug,
  } = { ...defaultOptions, ...options };

  await Render.initRenderer(width, height, sprites, element);
  Core.initMainLoop();
  if (physics) Core.initPhysics();
  if (debug) Debug.initDebugTools();
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
