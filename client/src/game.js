import * as Core from './internal/core';
import * as Render from './internal/render';
import * as Debug from './internal/debug';

const TIME_BEFORE_SPLASH_SCREEN_SHOWS = 500;

const defaultOptions = {
  physics: false,
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


  let splashScreen = null;
  const splashScreenTimer = setTimeout(() => {
    splashScreen = setSplashScreen(element);
  }, TIME_BEFORE_SPLASH_SCREEN_SHOWS);

  await Render.initRenderer(width, height, sprites, element);
  Core.initMainLoop();
  if (physics) Core.initPhysics();
  start();
  if (debug) Debug.initDebugTools();

  clearTimeout(splashScreenTimer);
  if (splashScreen) {
    splashScreen.remove();
  }
}

function setSplashScreen(element) {
  const splash = document.createElement('div');
  splash.style.fontSize = '32pt';
  splash.style.zIndex = '100';
  splash.style.color = 'white';
  splash.style.position = 'absolute';
  splash.style.top = '20px';
  splash.style.left = '20px';
  splash.textContent = 'LOADING...';
  element.appendChild(splash);
  return splash;
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

export function getGraphics() {
  return Render.getGraphics();
}

export function getPhysicsEngine() {
  return Core.getPhysicsEngine();
}

export function getPIXI() {
  return Render.getPIXI();
}

export function getTexture(filename) {
  return Render.getTexture(filename);
}

export function addEmitter(id, textures, config) {
  Render.addEmitter(id, textures, config);
}

export function getEmitter(id) {
  return Core.getEmitter(id);
}
