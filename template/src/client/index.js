// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1';
import sprites from './sprites.json';
import scanGamepads from './behaviors/scanGamepads';

// import createControllerPresets from './controllerPresets';

Game.init(1000, 900, sprites, { debug: true, physics: true }).then(() => {
  Game.start();
  Debug.toggleHitboxes();
  // createControllerPresets();

  const input = Entity.create('input');
  input.behaviors.scan = scanGamepads();
});
