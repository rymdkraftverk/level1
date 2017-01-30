
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

  module.exports =  {
    Core, Render, Entity, Timer, Gamepad, Key, Debug, Physics
  }
}
else {
  //Export server stuff
}
