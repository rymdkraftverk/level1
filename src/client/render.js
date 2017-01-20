import * as PIXI from 'pixi.js';
import { setDraw } from './core.js';

const VOID_COLOR = 0xccc;

let stage, renderer;

export function createRenderer(width, height, sprites, element) {
  return new Promise((resolve, reject) => {
    if (!sprites) reject('Sprites should be an array of file names to load');   
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    stage = new PIXI.Container();
    renderer = new PIXI.CanvasRenderer(width, height);
    renderer.backgroundColor = VOID_COLOR;
    const { view } = renderer;
    element ? element.appendChild(view) : document.body.appendChild(view);
    setDraw(draw);
    loadAssets(sprites, resolve);
  });
}

function loadAssets(sprites, resolve) {
  const loader = PIXI.loader;
  sprites.forEach((sprite) => {
    const file = "assets/" + sprite + '.png';
    loader.add(sprite, file);
  });
  loader.once('complete', () => {
    resolve();
  });
  loader.load();
}

export function getStage() {
  return stage;
}

export function getSprite(filename){
  console.log('pixi textures', PIXI.loader.resources);
  return new PIXI.Sprite(getTexture(filename));
}

export function getAnimation(filenames, animationSpeed){
  const textures = []

  filenames.map((filename) => {
    textures.push(getTexture(filename));
  });

  const animation = new PIXI.extras.AnimatedSprite(textures);
  animation.animationSpeed = animationSpeed;
  
  return animation;
}

function getTexture(filename){
  const { texture } = PIXI.loader.resources[filename];
  return texture
}

export function add(sprite){
  stage.addChild(sprite);
}

export function remove(sprite){
  stage.removeChild(sprite);
}

export function removeAll(){
  stage.removeChildren();
}

function draw() {
  renderer.render(stage);
}
