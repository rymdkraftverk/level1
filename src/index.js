
//Detect if running in browser
if (typeof window !== 'undefined'){

  const Core = require('./client/core');
  const Render = require('./client/render');
  const Entity = require('./client/entity');
  const Timer = require('./client/timer');
  const Gamepad = require('./client/gamepad');
  const Key = require('./client/key');
  const Debug = require('./client/debug');

  module.exports =  {
    Core, Render, Entity, Timer, Gamepad, Key, Debug
  }
}
else {
  //Export server stuff
}
