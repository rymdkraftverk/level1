import * as PIXI from 'pixi.js';
import 'pixi-particles';
import 'pixi-filters';

const ASSETS_FOLDER = 'assets';

const assetsToLoad = [
  {
    key: 'sprites',
    fileFormat: 'png',
  },
  {
    key: 'fonts',
    fileFormat: 'fnt',
  },
];

const VOID_COLOR = 0xccc;

let stage;
let renderer;
let internalGraphics;
let _showHitboxes = false;

export function draw() {
  renderer.render(stage);
  internalGraphics.clear();
}

function updateRenderLayers() {
  stage.children.sort((a, b) => {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex;
  });
}

export function add(child) {
  stage.addChild(child);
  updateRenderLayers();
}

function loadAssets(assets, resolve) {
  const { loader } = PIXI;

  assetsToLoad.forEach(({ key, fileFormat }) => {
    if (!assets[key]) {
      return;
    }
    assets[key].forEach((asset) => {
      const file = `${ASSETS_FOLDER}/${asset}.${fileFormat}`;
      loader.add(asset, file);
    });
  });

  loader.once('complete', resolve);

  loader.load();
}

export function initRenderer(width, height, assets, element, pixiOptions, pixiSettings) {
  return new Promise(async (resolve) => {
    if (assets && !assets.sprites) {
      console.warn('level1: No sprites found in the assets file. Make sure that the sprites are a list of filenames to load.');
    }

    if (pixiSettings) {
      Object
        .entries(pixiSettings)
        .forEach(([key, value]) => {
          PIXI.settings[key] = value;
        });
    }
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    stage = new PIXI.Container();

    renderer = new PIXI.WebGLRenderer({ width, height, ...pixiOptions });
    renderer.backgroundColor = VOID_COLOR;
    const { view } = renderer;
    element.appendChild(view);

    internalGraphics = new PIXI.Graphics();
    internalGraphics.zIndex = 9999;
    add(internalGraphics);

    if (assets) {
      loadAssets(assets, resolve);
    } else {
      const { loader } = PIXI;
      /* Load all assets from the public/assets folder */
      await loadAssetsFromServer(ASSETS_FOLDER);
      loader.once('complete', resolve);
      loader.load();
    }
  });
}

const loadAssetsFromServer = (path) => new Promise((resolve) => {
  fetch(`/${path}`)
    .then(data => data.text())
    .then(async html => {
      // Create a dom element from the response in order to find the right node
      const el = document.createElement('html');
      el.innerHTML = html;
      const inAssetFolder = [...el.querySelectorAll(`a[href^='/${path}']`)];
      if (inAssetFolder.length > 0) {
        const { loader } = PIXI;
        let subFolders = [];

        inAssetFolder
          .map((f) => f.innerHTML)
          .forEach((fileName) => {
            if (fileName === '../') {
              return;
            }

            // Check if the fileName is a folder
            if (fileName.lastIndexOf('/') === fileName.length - 1) {
              subFolders = subFolders.concat(fileName.substring(0, fileName.length - 1));
              // Else we have a file that we should load
            } else {
              const name = fileName.substring(0, fileName.lastIndexOf('.'));
              if (name.length === 0) {
                console.warn(`level1: Asset loader ignoring ${fileName} due to empty file name`);
              } else {
                loader.add(name, `${path}/${fileName}`);
              }
            }
          });
        await Promise.all(subFolders.map((subfolder) => loadAssetsFromServer(`${path}/${subfolder}`)));
        resolve();
      } else {
        console.warn('level1: No assets detected in assets folder');
        resolve();
      }
    });
});

export function getRenderer() {
  return renderer;
}

export function getStage() {
  return stage;
}

export function getTexture(filename) {
  const resource = PIXI.loader.resources[filename];
  if (!resource) throw new Error(`Sprite ${filename} not found. Make sure that it is added to your assets.json`);
  const { texture } = resource;
  return texture;
}

export function addEmitter(filenames, config, zIndex) {
  const particleContainer = new PIXI.Container();
  particleContainer.zIndex = zIndex;
  add(particleContainer);
  return {
    emitter: new PIXI.particles.Emitter(particleContainer, filenames.map(getTexture), config),
    particleContainer,
  };
}

export function getNewPIXISprite(filename) {
  return new PIXI.Sprite(getTexture(filename));
}

export function getAnimation(filenames, animationSpeed) {
  const textures = [];

  filenames.forEach((filename) => {
    textures.push(getTexture(filename));
  });

  const animation = new PIXI.extras.AnimatedSprite(textures);
  animation.animationSpeed = animationSpeed;

  return animation;
}

export function getText(text, style) {
  return new PIXI.Text(text, style);
}

export function getBitmapText(text, style) {
  return new PIXI.extras.BitmapText(text, style);
}

export function getGraphics() {
  return new PIXI.Graphics();
}

export function remove(child) {
  child.destroy();
  stage.removeChild(child);
}

export function removeAll() {
  stage.removeChildren();
}

export function showHitboxes(show) {
  _showHitboxes = show;
  return _showHitboxes;
}

export function getShowHitboxes() {
  return _showHitboxes;
}

export function displayBodyBounds(body) {
  if (!_showHitboxes) return;

  const { vertices } = body.parts[0];

  internalGraphics.lineStyle(2, 0xFFFFFF, 1);
  internalGraphics.moveTo(vertices[0].x, vertices[0].y);

  for (let i = 1; i < vertices.length; i += 1) {
    if (!vertices[i - 1].isInternal) {
      internalGraphics.lineTo(vertices[i].x, vertices[i].y);
    } else {
      internalGraphics.moveTo(vertices[i].x, vertices[i].y);
    }
    if (vertices[i].isInternal) {
      internalGraphics.moveTo(
        vertices[(i + 1) % vertices.length].x,
        vertices[(i + 1) % vertices.length].y,
      );
    }
  }

  internalGraphics.lineTo(vertices[0].x, vertices[0].y);
}

export function displayEntityBounds(entity) {
  if (!_showHitboxes) return;

  internalGraphics.lineStyle(2, 0xFFFFFF, 1);
  internalGraphics.moveTo(entity.x, entity.y);
  internalGraphics.lineTo(entity.x + entity.width, entity.y);
  internalGraphics.lineTo(entity.x + entity.width, entity.y + entity.height);
  internalGraphics.lineTo(entity.x, entity.y + entity.height);
  internalGraphics.lineTo(entity.x, entity.y);
}
