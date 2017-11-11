// eslint-disable-next-line no-unused-vars
import { Core, Render, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net } from 'l1';

import sprites from './sprites.json';

import scanGamepads from './behaviors/scanGamepads';

// import createControllerPresets from './controllerPresets';

Render.createRenderer(1000, 900, sprites).then(() => {
  Core.createCore();
  Core.createPhysics();
  Core.start();
  Debug.initDebugTools();
  Render.toggleHitboxes();
  // createControllerPresets();

  const input = Entity.create('input');
  input.behaviours.scan = scanGamepads();
});
