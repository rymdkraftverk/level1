
//Detect if running in browser
if (typeof window !== 'undefined'){

  const Core = require('./client/core');
  const Render = require('./client/render');
  const Entity = require('./client/entity');
  const Timer = require('./client/timer');
  const Gamepad = require('./client/gamepad');
  const Key = require('./client/key');
  const Debug = require('./client/debug');
  const Physics = require('matter-js');
  const Util = require('./client/util');
  const Sound = require('./client/sound');

  module.exports =  {
    Core, Render, Entity, Timer, Gamepad, Key, Debug, Physics, Util, Sound
  }
}
else {
  //Export server stuff
}
