import 'babel-polyfill';

const Matter = require('matter-js');
const PIXI = require('pixi.js');

const Game = require('./Game');
const Entity = require('./Entity');
const Gamepad = require('./Gamepad');
const Key = require('./Key');
const Debug = require('./Debug');
const Physics = require('./Physics');
const Util = require('./Util');
const Sound = require('./Sound');
const Net = require('./Net');
const Animation = require('./Animation');
const Particles = require('./Particles');
const Text = require('./Text');
const BitmapText = require('./BitmapText');
const Graphics = require('./Graphics');
const Filter = require('./Filter');
const Behavior = require('./Behavior');

const entity = require('./next/entityCreator/entity').default;
const sprite = require('./next/entityCreator/sprite').default;

const getX = require('./next/entityUtil/getX').default;
const getY = require('./next/entityUtil/getY').default;

module.exports = {
  Game,
  Entity,
  Gamepad,
  Key,
  Debug,
  Physics,
  Util,
  Sound,
  Net,
  Animation,
  Particles,
  Text,
  BitmapText,
  Graphics,
  Filter,
  Behavior,
  Matter,
  PIXI,
  entity,
  sprite,
  getX,
  getY,
};
