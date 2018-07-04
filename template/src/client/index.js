// eslint-disable-next-line no-unused-vars
import { Game, Entity, Timer, Key, Debug, Gamepad, Physics, Sound, Net, Text } from 'l1';
import assets from './assets.json';
import config from './emitter.json';
import scanGamepads from './behaviors/scanGamepads';

// import createControllerPresets from './controllerPresets';

Game.init({
  width: 600, height: 400, assets, debug: true, physics: true,
}).then(() => {
  Game.getPhysicsEngine().world.gravity.y = 1;

  // createControllerPresets();

  const input = Entity.create('input');
  input.behaviors.scan = scanGamepads();

  const square = Entity.create('square');
  const sprite = Entity.addSprite(square, 'square');
  Entity.addBody(square, Physics.Bodies.rectangle(100, 10, 80, 80));
  sprite.scale.set(5);

  Entity.addEmitter(square, {
    id: 'player1',
    textures: ['particle'],
  });
  setTimeout(() => {
    Entity.emitEmitter(square, {
      id: 'player1',
      config,
    });
  }, 2000);

  const text = Entity.addText(square, 'Hello!', {
    font: '400px Arial',
    fill: 'white',
  });

  const originalScale = 10;
  text.position.x = originalScale;
  text.position.y = originalScale;

  text.scale.set(0.1);

  const scaleText = () => ({
    run: (b, e) => {
      e.text.scale.set(e.text.scale.x * 1.005);
    },
  });
  square.behaviors.scaleText = scaleText();

  setTimeout(() => {
    // Entity.destroy(square);
  }, 2400);

  const floor = Entity.create('floor');
  Entity.addBody(floor, Physics.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));
});

