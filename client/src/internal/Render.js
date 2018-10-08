import * as PIXI from 'pixi.js';
import 'pixi-particles';
import 'pixi-filters';
import getGlobalPosition from './getGlobalPosition';

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

let _stage;
let _renderer;
let _internalGraphics;
let _showHitboxes = false;
let _ratio = 1;
let _gameWidth;
let _gameHeight;

export function draw() {
  _renderer.render(_stage);
  _internalGraphics.clear();
}

function updateRenderLayers(displayObject) {
  displayObject.children.sort((a, b) => {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex;
  });
}

export function add(parent, child) {
  parent.addChild(child);
  updateRenderLayers(parent);
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

    _stage = new PIXI.Container();

    _renderer = new PIXI.WebGLRenderer({ width, height, ...pixiOptions });
    _renderer.backgroundColor = VOID_COLOR;
    const { view } = _renderer;
    element.appendChild(view);

    _internalGraphics = new PIXI.Graphics();
    _internalGraphics.zIndex = 9999;
    add(getStage(), _internalGraphics);

    if (assets) {
      loadAssets(assets, resolve);
    } else {
      const { loader } = PIXI;
      /* Load all assets from the public/assets folder */
      await loadAssetsFromServer(ASSETS_FOLDER);
      loader.load(resolve);
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
              } else if (fileName.substring(fileName.lastIndexOf('.'), fileName.length) === '.json') {
                loader.add(`${path}/${fileName}`);
              } else {
                console.warn(`level1: Asset loader ignoring ${fileName} due to only supporting .json files`);
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
  return _renderer;
}

export function getStage() {
  return _stage;
}

export function getTexture(filename) {
  const texture = PIXI.Texture.fromFrame(`${filename}.png`);
  if (!texture) throw new Error(`level1: Texture "${filename}" not found.`);
  return texture;
}

export function remove(parent, child) {
  child.destroy({ children: true });
  parent.removeChild(child);
}

export function removeAll() {
  _stage.removeChildren();
}

export function setShowHitboxes(show) {
  _showHitboxes = show;
  return _showHitboxes;
}

export function getShowHitboxes() {
  return _showHitboxes;
}

export function displayBodyBounds(body) {
  const { vertices } = body.parts[0];

  _internalGraphics
    .lineStyle(2, 0xFFFFFF, 1)
    .moveTo(vertices[0].x, vertices[0].y);

  for (let i = 1; i < vertices.length; i += 1) {
    if (!vertices[i - 1].isInternal) {
      _internalGraphics.lineTo(vertices[i].x, vertices[i].y);
    } else {
      _internalGraphics.moveTo(vertices[i].x, vertices[i].y);
    }
    if (vertices[i].isInternal) {
      _internalGraphics.moveTo(
        vertices[(i + 1) % vertices.length].x,
        vertices[(i + 1) % vertices.length].y,
      );
    }
  }

  _internalGraphics.lineTo(vertices[0].x, vertices[0].y);
}

const getWidth = (entity) => (entity.asset.hitArea && entity.asset.hitArea.width)
  || entity.asset.width;
const getHeight = (entity) => (entity.asset.hitArea && entity.asset.hitArea.height)
  || entity.asset.height;

export function displayEntityBounds(entity) {
  const width = getWidth(entity);
  const height = getHeight(entity);

  const { x, y } = getGlobalPosition(entity, getRatio());

  _internalGraphics
    .lineStyle(2, 0xFFFFFF, 1)
    .moveTo(x, y)
    .lineTo(x + width, y)
    .lineTo(x + width, y + height)
    .lineTo(x, y + height)
    .lineTo(x, y);
}

export const getRatio = () => _ratio;
export const setRatio = (ratio) => { _ratio = ratio; };

export const getGameWidth = () => _gameWidth;
export const setGameWidth = (gameWidth) => { _gameWidth = gameWidth; };

export const getGameHeight = () => _gameHeight;
export const setGameHeight = (gameHeight) => { _gameHeight = gameHeight; };
