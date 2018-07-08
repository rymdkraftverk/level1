import 'babel-polyfill';

const Game = require('./Game');
const Entity = require('./Entity');
const Timer = require('./Timer');
const Gamepad = require('./Gamepad');
const Key = require('./Key');
const Debug = require('./Debug');
const Physics = require('./Physics');
const Util = require('./Util');
const Sound = require('./Sound');
const Net = require('./Net');
const Animation = require('./Animation');
const Sprite = require('./Sprite');
const Particles = require('./Particles');
const Text = require('./Text');
const BitmapText = require('./BitmapText');
const Graphics = require('./Graphics');

const Matter = require('matter-js');

module.exports = {
  Game,
  Entity,
  Timer,
  Gamepad,
  Key,
  Debug,
  Physics,
  Util,
  Sound,
  Net,
  Animation,
  Sprite,
  Particles,
  Text,
  BitmapText,
  Graphics,
  Matter,
};
