import 'babel-polyfill';

const Matter = require('matter-js');
const PIXI = require('pixi.js');

const Entity = require('./Entity');
const Gamepad = require('./Gamepad');
const Key = require('./Key');
const Debug = require('./Debug');
const Physics = require('./Physics');
const Util = require('./Util');
const Sound = require('./Sound');
const Net = require('./Net');
const Particles = require('./Particles');
const BitmapText = require('./BitmapText');
const Filter = require('./Filter');
const Behavior = require('./Behavior');

const entity = require('./next/entityCreator/entity').default;
const sprite = require('./next/entityCreator/sprite').default;
const animation = require('./next/entityCreator/animation').default;
const graphics = require('./next/entityCreator/graphics').default;
const text = require('./next/entityCreator/text').default;

const addBehavior = require('./next/entityModifier/addBehavior').default;
const scaleText = require('./next/entityModifier/scaleText').default;

const getX = require('./next/entityUtil/getX').default;
const getY = require('./next/entityUtil/getY').default;

const getPhysicsEngine = require('./next/game/getPhysicsEngine').default;
const getRenderer = require('./next/game/getRenderer').default;
const getStage = require('./next/game/getStage').default;
const init = require('./next/game/init').default;
const resize = require('./next/game/resize').default;
const start = require('./next/game/start').default;
const stop = require('./next/game/stop').default;

module.exports = {
  Entity,
  Gamepad,
  Key,
  Debug,
  Physics,
  Util,
  Sound,
  Net,
  Particles,
  text,
  BitmapText,
  Filter,
  Behavior,
  Matter,
  PIXI,
  animation,
  entity,
  sprite,
  graphics,
  getX,
  getY,
  addBehavior,
  scaleText,
  getPhysicsEngine,
  getRenderer,
  getStage,
  init,
  resize,
  start,
  stop,
};
