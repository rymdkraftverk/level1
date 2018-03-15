import 'babel-polyfill';

const Game = require('./game');
const Entity = require('./entity');
const Timer = require('./timer');
const Gamepad = require('./gamepad');
const Key = require('./key');
const Debug = require('./debug');
const Physics = require('matter-js');
const Util = require('./util');
const Sound = require('./sound');
const Net = require('./net');

module.exports = {
  Game, Entity, Timer, Gamepad, Key, Debug, Physics, Util, Sound, Net,
};
