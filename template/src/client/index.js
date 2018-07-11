import { Game, Entity, Timer, Physics, Text, Matter, Sprite, Particles, Animation } from 'l1';
import assets from './assets.json';
import config from './emitter.json';
import scanGamepads from './behaviors/scanGamepads';

// import createControllerPresets from './controllerPresets';

const lizardRotation = () => ({
  timer: Timer.create({ duration: 120 }),
  speed: 0.025,
  textures: {
    front: ['lizardFront1', 'lizardFront2'],
    right: ['lizardRight1', 'lizardRight2'],
  },
  run: (b, e) => {
    if (Timer.run(b.timer)) {
      const animation = Animation.play(e, {
        speed: b.speed,
        textures: b.textures.right,
      });
      animation.scale.set(3);
    }
  },
});

Game.init({
  width: 600, height: 400, assets, debug: true, physics: true,
}).then(() => {
  Physics.getEngine().world.gravity.y = 1;

  // createControllerPresets();
  const root = Entity.getRoot();

  const input = Entity.addChild(Entity.getRoot(), { id: 'input' });
  input.behaviors.scan = scanGamepads();

  const square = Entity.addChild(Entity.getRoot(), { id: 'square' });

  Sprite.show(square, { texture: 'square' });
  square.asset.scale.set(5);

  Physics.addBody(square, Matter.Bodies.rectangle(100, 10, 80, 80));

  const text = Entity.addChild(
    square,
    { id: 'text', x: -50, y: -50 },
  );
  Text.show(text, {
    text: 'Hello!',
    style: {
      fontFamily: 'Arial',
      fontSize: '400px',
      fill: 'white',
    },
  });
  text.asset.scale.set(0.1);

  const scaleText = () => ({
    run: (b, e) => {
      e.asset.scale.set(e.asset.scale.x * 1.005);
    },
  });
  text.behaviors.scaleText = scaleText();

  const selfdestruct = () => ({
    timer: Timer.create({ duration: 120 }),
    run: (b, e) => {
      Timer.run(b.timer);
      if (b.timer.finished) {
        const explosion = Entity.addChild(root, {
          x: Entity.getX(square),
          y: Entity.getY(square),
        });
        Particles.emit(explosion, {
          textures: ['square'],
          config,
        });
        Entity.destroy(e);
      }
    },
  });
  square.behaviors.selfdestruct = selfdestruct();

  const lizard = Entity.addChild(root, {
    x: 300,
    y: 50,
  });

  lizard.behaviors.lizardRotation = lizardRotation();

  Animation.play(lizard, {
    textures: ['lizardFront1', 'lizardFront2'],
    speed: 0.025,
  });
  lizard.asset.scale.set(3);

  const floor = Entity.addChild(Entity.getRoot(), { id: 'floor' });
  Physics.addBody(floor, Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));
});
