
//Detect if running in browser
if (typeof window !== 'undefined'){

  const Core = require('./client/core');
  const Render = require('./client/render');
  const Entity = require('./client/entity');
  const Timer = require('./client/timer');

  module.exports =  {
    Core, Render, Entity, Timer
  }
}
else {
  //Export server stuff
}
