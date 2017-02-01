
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

  module.exports =  {
    Core, Render, Entity, Timer, Gamepad, Key, Debug, Physics, Util
  }
}
else {
  //Export server stuff
}
