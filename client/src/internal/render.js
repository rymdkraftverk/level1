import * as PIXI from 'pixi.js';
import 'pixi-particles';
import * as Core from './core';

const VOID_COLOR = 0xccc;

let stage;
let renderer;
let graphics;
let internalGraphics;
let emitterContainer;
let _showHitboxes = false;

function draw() {
  renderer.render(stage);
  graphics.clear();
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

function createPIXIGraphics() {
  const pixiGraphics = new PIXI.Graphics();
  pixiGraphics.zIndex = 9999;
  add(pixiGraphics);
  return pixiGraphics;
}

function loadAssets(sprites, resolve) {
  const { loader } = PIXI;
  sprites.forEach((sprite) => {
    const file = `assets/${sprite}.png`;
    loader.add(sprite, file);
  });
  loader.once('complete', () => {
    resolve();
  });
  loader.load();
}

export function initRenderer(width, height, sprites, element) {
  return new Promise((resolve, reject) => {
    if (!sprites) reject(new Error('Sprites should be an array of file names to load'));

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    stage = new PIXI.Container();

    renderer = new PIXI.WebGLRenderer(width, height);
    renderer.backgroundColor = VOID_COLOR;
    const { view } = renderer;
    element.appendChild(view);

    Core.setDraw(draw);

    graphics = createPIXIGraphics();
    internalGraphics = createPIXIGraphics();

    emitterContainer = new PIXI.Container();
    stage.addChild(emitterContainer);

    loadAssets(sprites, resolve);
  });
}

export function addEmitter(id, textures, config) {
  const emitter = new PIXI.particles.Emitter(emitterContainer, textures, config);
  emitter.id = id;
  Core.addEmitter(emitter);
}

export function getRenderer() {
  return renderer;
}

export function getStage() {
  return stage;
}

export function getGraphics() {
  return graphics;
}

export function getPIXI() {
  return PIXI;
}

export function getTexture(filename) {
  const resource = PIXI.loader.resources[filename];
  if (!resource) throw new Error(`Sprite ${filename} not found. Make sure that it is added to your sprites.json`);
  const { texture } = resource;
  return texture;
}

export function getSprite(filename) {
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

export function remove(child) {
  const removedChild = stage.removeChild(child);
  return removedChild;
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

export function displaySpriteBounds(sprite) {
  if (!_showHitboxes) return;

  internalGraphics.lineStyle(2, 0xFFFFFF, 1);
  internalGraphics.moveTo(sprite.x, sprite.y);
  internalGraphics.lineTo(sprite.x + sprite.width, sprite.y);
  internalGraphics.lineTo(sprite.x + sprite.width, sprite.y + sprite.height);
  internalGraphics.lineTo(sprite.x, sprite.y + sprite.height);
  internalGraphics.lineTo(sprite.x, sprite.y);
}
