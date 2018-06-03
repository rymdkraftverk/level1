import { Game, Entity, Gamepad, Physics } from 'l1';
import sprites from './sprites.json';
import scanGamepads from './behaviors/scanGamepads';

Game.init(600, 400, sprites, { debug: true, physics: true }).then(() => {
  Game.getPhysicsEngine().world.gravity.y = 1;

  const input = Entity.create('input');
  input.behaviors.scan = scanGamepads();

  const square = Entity.create('square');
  const sprite = Entity.addSprite(square, 'square');
  Entity.addBody(square, Physics.Bodies.rectangle(100, 10, 80, 80));
  sprite.scale.set(5);

  const floor = Entity.create('floor');
  Entity.addBody(floor, Physics.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));

  const player = Entity.create('player');
  player.behaviors.controlPlayer = controlPlayer();
});

const controlPlayer = () => ({
  init: (b, e) => {
    console.log('im here');
  },
  run: (b, e) => {
    if (Gamepad.isPressed(0, 0)) {
      console.log('pressed mf');
    }
  },
});
