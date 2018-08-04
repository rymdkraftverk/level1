import { Game, Entity, Timer, Physics, Text, Matter, Sprite, Particles, Animation, Sound, Graphics } from 'l1';
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
      animation.anchor.set(0.2);
    }
  },
});

const direction = {
  LEFT: 'left',
  RIGHT: 'right',
};

const lizardMove = (start, end) => ({
  direction: direction.LEFT,
  run: (b, e) => {
    if (b.direction === direction.LEFT) {
      e.x = Entity.getX(e) - 1;
      if (e.x < start) {
        b.direction = direction.RIGHT;
      }
    } else if (b.direction === direction.RIGHT) {
      e.x = Entity.getX(e) + 6;
      if (e.x > end) {
        b.direction = direction.LEFT;
      }
    }
  },
});

const checkCollision = () => ({
  init: (b, e) => {

  },
  run: (b, e) => {
    if (Entity.isColliding(e, Entity.get('box'))) {
      console.log('COLLIDING!');
    }
  },
});


Game.init({
  width: 600,
  height: 400,
  assets,
  debug: true,
  physics: true,
  antialias: true,
}).then(() => {
  Physics.getEngine().world.gravity.y = 1;

  // createControllerPresets();
  const root = Entity.getRoot();

  const input = Entity.addChild(root, { id: 'input' });
  input.behaviors.scan = scanGamepads();

  const square = Entity.addChild(root, { id: 'square' });

  Sprite.show(square, { texture: 'square' });
  square.asset.scale.set(5);

  Physics.addBody(square, Matter.Bodies.rectangle(140, 50, 80, 80, {
    inertia: Infinity,
  }));

  const appearSound = Entity.addChild(square);
  Sound.play(appearSound, {
    src: './sounds/join3.wav',
  });

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
      if (b.timer && Timer.run(b.timer)) {
        const explosion = Entity.addChild(root, {
          x: Entity.getX(square),
          y: Entity.getY(square),
        });
        Particles.emit(explosion, {
          textures: ['square'],
          config,
          zIndex: 1,
        });
        Entity.destroy(e);
      }
    },
  });
  square.behaviors.selfdestruct = selfdestruct();

  const lizard = Entity.addChild(root, {
    x: 300,
    y: 50,
    width: 24,
    height: 24,
  });

  lizard.behaviors.lizardRotation = lizardRotation();
  lizard.behaviors.checkCollision = checkCollision();
  lizard.behaviors.lizardMove = lizardMove(50, 450);

  Animation.play(lizard, {
    textures: ['lizardFront1', 'lizardFront2'],
    speed: 0.025,
  });
  lizard.asset.scale.set(3);
  lizard.asset.anchor.set(0.2);

  const box = Entity.addChild(root, { id: 'box', width: 100, height: 100 });
  const boxGraphics = Graphics.create(box, { zIndex: 10 });

  // set a fill and line style
  boxGraphics.beginFill(0xFF3300);
  boxGraphics.lineStyle(4, 0xffd900, 1);

  // draw a shape
  boxGraphics.moveTo(50, 50);
  boxGraphics.lineTo(250, 50);
  boxGraphics.lineTo(100, 100);
  boxGraphics.lineTo(50, 50);
  boxGraphics.endFill();

  const floor = Entity.addChild(root, { id: 'floor' });
  Physics.addBody(floor, Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));
});
