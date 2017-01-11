
//Detect if running in browser
if (typeof window !== 'undefined'){

  const Core = require('./client/core');
  const Render = require('./client/render');
  const Entity = require('./client/entity');

  module.exports =  {
    Core, Render, Entity
  }
}
else {
  //Export server stuff
}
