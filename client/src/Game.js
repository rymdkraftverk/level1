import * as Core from './internal/Core';
import * as Render from './internal/Render';
import * as Debug from './internal/Debug';
import * as Entity from './Entity';

const TIME_BEFORE_SPLASH_SCREEN_SHOWS = 500;

const defaultOptions = {
  width: 800,
  height: 600,
  physics: false,
  element: document.body,
  debug: false,
};

let gameWidth;
let gameHeight;
let ratio = 1;

export async function init(options) {
  // Replace default options with user specified ones
  const {
    width,
    height,
    assets,
    physics,
    element,
    debug,
    ...pixiOptions
  } = { ...defaultOptions, ...options };

  if (!assets) {
    console.warn('level1: No assets passed to Game.init()');
  }

  gameWidth = width;
  gameHeight = height;

  let splashScreen = null;
  const splashScreenTimer = setTimeout(() => {
    splashScreen = setSplashScreen(element);
  }, TIME_BEFORE_SPLASH_SCREEN_SHOWS);

  await Render.initRenderer(width, height, assets, element, pixiOptions);
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

export function resize(width, height) {
  ratio = Math.min(width / gameWidth, height / gameHeight);
  getStage()
    .scale
    .set(ratio);

  getRenderer()
    .resize(gameWidth * ratio, gameHeight * ratio);

  /*
    The following code is needed to counteract the scale change on the whole canvas since
    texts get distorted by PIXI when you try to change their scale.
    Texts instead change size by setting their fontSize.
  */
  Entity.getAll()
    .forEach((e) => {
      if (e.originalSize) {
        e.asset.style.fontSize = e.originalSize * ratio;
        e.asset.scale.set(1 / ratio);
      }
    });
}

export function getRatio() {
  return ratio;
}
