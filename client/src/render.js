import * as PIXI from 'pixi.js';
import { setDraw } from './core';

const VOID_COLOR = 0xccc;

let stage;
let renderer;
let graphics;
let showHitboxes = false;

function draw() {
  renderer.render(stage);
  graphics.clear();
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

function getPIXIGraphics() {
  const pixiGraphics = new PIXI.Graphics();
  pixiGraphics.zIndex = 9999;
  add(pixiGraphics);
  return pixiGraphics;
}

function loadAssets(sprites, resolve) {
  const loader = PIXI.loader;
  sprites.forEach((sprite) => {
    const file = `assets/${sprite}.png`;
    loader.add(sprite, file);
  });
  loader.once('complete', () => {
    resolve();
  });
  loader.load();
}

export function createRenderer(width, height, sprites, element) {
  return new Promise((resolve, reject) => {
    if (!sprites) reject('Sprites should be an array of file names to load');
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    stage = new PIXI.Container();
    renderer = new PIXI.CanvasRenderer(width, height);
    renderer.backgroundColor = VOID_COLOR;
    const { view } = renderer;
    // eslint-disable-next-line no-unused-expressions, no-undef 
    element ? element.appendChild(view) : document.body.appendChild(view);
    setDraw(draw);
    graphics = getPIXIGraphics();
    loadAssets(sprites, resolve);
  });
}

export function getStage() {
  return stage;
}

function getTexture(filename) {
  const { texture } = PIXI.loader.resources[filename];
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

/*
  Check PIXI.Text docs for available style options
*/
export function getText(text, style) {
  return new PIXI.Text(text, style);
}

export function remove(child) {
  stage.removeChild(child);
}

export function removeAll() {
  stage.removeChildren();
}

export function toggleHitboxes() {
  showHitboxes = !showHitboxes;
}

export function displayBounds(body) {
  if (!showHitboxes) return;

  const { vertices } = body.parts[0];

  graphics.lineStyle(2, 0xFFFFFF, 1);
  graphics.moveTo(vertices[0].x, vertices[0].y);

  for (let i = 1; i < vertices.length; i += 1) {
    if (!vertices[i - 1].isInternal) {
      graphics.lineTo(vertices[i].x, vertices[i].y);
    } else {
      graphics.moveTo(vertices[i].x, vertices[i].y);
    }
    if (vertices[i].isInternal) {
      graphics.moveTo(vertices[(i + 1) % vertices.length].x, vertices[(i + 1) % vertices.length].y);
    }
  }

  graphics.lineTo(vertices[0].x, vertices[0].y);
}
