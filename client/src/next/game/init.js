import * as Core from '../../internal/Core';
import * as Render from '../../internal/Render';
import * as Debug from '../../internal/Debug';
import start from './start';

const TIME_BEFORE_SPLASH_SCREEN_SHOWS = 500;

const defaultOptions = {
  width: 800,
  height: 600,
  physics: false,
  element: document.body,
  debug: false,
};

export default async (options) => {
  const {
    pixi = {
      options: null,
      settings: null,
    }, ...level1Options
  } = options;

  // Replace default options with user specified ones
  const {
    width,
    height,
    assets,
    physics,
    element,
    debug,
  } = { ...defaultOptions, ...level1Options };

  Render.setGameWidth(width);
  Render.setGameHeight(height);

  let splashScreen = null;
  const splashScreenTimer = setTimeout(() => {
    splashScreen = setSplashScreen(element);
  }, TIME_BEFORE_SPLASH_SCREEN_SHOWS);


  const {
    options: pixiOptions,
    settings: pixiSettings,
  } = pixi;

  await Render.initRenderer(width, height, assets, element, pixiOptions, pixiSettings);
  Core.initMainLoop();
  if (physics) Core.initPhysics();
  start();
  if (debug) Debug.initDebugTools();

  clearTimeout(splashScreenTimer);
  if (splashScreen) {
    splashScreen.remove();
  }
};

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
