import {
  Entity,
  Physics,
  Text,
  Matter,
  Particles,
  animation,
  Sound,
  Graphics,
  PIXI,
  Filter,
  entity,
  sprite,
  getX,
  getY,
  addBehavior,
  init,
  getPhysicsEngine,
  resize,
} from 'l1';
import config from './emitter.json';

// const lizardRotation = () => ({
//   timer: Timer.create({ duration: 120 }),
//   speed: 0.075,
//   textures: {
//     front: ['lizardFront1', 'lizardFront2'],
//     right: ['Samurai-move-1', 'Samurai-move-2'],
//   },
//   onComplete: (b, e) => {
//     const animation = Animation.play(e, {
//       speed: b.speed,
//       textures: b.textures.right,
//     });
//     animation.scale.set(2);
//     animation.anchor.set(0.2);
//   },
// });

const direction = {
  LEFT: 'left',
  RIGHT: 'right',
};

/* eslint-disable no-param-reassign */
const lizardMove = (start, end) => ({
  direction: direction.LEFT,
  onUpdate: (b, e) => {
    if (b.direction === direction.LEFT) {
      e.x = getX(e) - 3;
      if (e.x < start) {
        b.direction = direction.RIGHT;
      }
    } else if (b.direction === direction.RIGHT) {
      e.x = getX(e) + 10;
      if (e.x > end) {
        b.direction = direction.LEFT;
      }
    }
  },
});
/* eslint-enable no-param-reassign */

init({
  width: 600,
  height: 400,
  debug: true,
  physics: true,
  pixi: {
    options: {
      antialias: true,
    },
    settings: {
      SCALE_MODE: PIXI.SCALE_MODES.NEAREST,
    },
  },
}).then(() => {
  getPhysicsEngine().world.gravity.y = 1;

  // createControllerPresets();

  // const input = Entity.addChild(root, { id: 'input' });
  // input.behaviors.scan = scanGamepads();

  const square = sprite({
    id: 'square',
    types: ['square', 'player'],
    texture: 'square',
  });

  square.asset.scale.set(5);
  Filter.add(square, Filter.Filter.GlowFilter);

  Physics.addBody(square, Matter.Bodies.rectangle(140, 50, 80, 80, {
    inertia: Infinity,
  }));

  const appearSound = entity({ parent: square });
  Sound.play(appearSound, {
    src: './sounds/join3.wav',
    volume: 0.2,
  });

  const text = entity(
    {
      id: 'text',
      x: -50,
      y: -50,
      parent: square,
    },
  );
  console.log('text', text);
  Text.show(text, {
    text: 'Hello!',
    style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 'white',
    },
  });
  text.asset.scale.set(0.1);

  // const text2 = Entity.addChild(
  //   text,
  //   { id: 'text2', x: -50, y: -50 },
  // );

  // Text.show(text2, {
  //   text: 'Hello222!',
  //   style: {
  //     fontFamily: 'Arial',
  //     fontSize: '400px',
  //     fill: 'white',
  //   },
  // });

  const scaleText = () => ({
    onUpdate: ({ counter }) => {
      // e.asset.scale.set(e.asset.scale.x * 1.005);
      // Text.scale(e, e.asset.style.fontSize + 0.0001);
    },
  });
  Text.scale(text, text.asset.style.fontSize + 100);
  addBehavior(scaleText(), text);

  const selfdestruct = () => ({
    endTime: 120,
    data: {
      test: 'test',
    },
    removeOnComplete: true,
    onComplete: ({ entity: e }) => {
      const explosion = entity({
        x: getX(square),
        y: getY(square),
      });
      Particles.emit(explosion, {
        textures: ['square', 'particle'],
        config,
        zIndex: 1,
      });
      Entity.destroy(e);
    },
  });
  addBehavior(selfdestruct(), square);

  const lizard = animation({
    x: 300,
    y: 50,
    width: 24,
    height: 24,
    textures: [
      'samurai-attack-1',
      'samurai-attack-1',
      'samurai-attack-1',
      'samurai-attack-1',
      'samurai-attack-2',
      'samurai-attack-3',
      'samurai-attack-4',
      'samurai-attack-5',
      'samurai-attack-6',
      'samurai-attack-7',
      'samurai-attack-7',
      'samurai-attack-7',
      'samurai-attack-7',
      'samurai-attack-8',
      'samurai-attack-8',
      'samurai-attack-8',
    ],
    speed: 0.4,
  });

  // lizard.behaviors.lizardRotation = lizardRotation();
  // lizard.behaviors.checkCollision = checkCollision();
  // lizard.behaviors.lizardMove = lizardMove(100, 450);

  lizard.asset.scale.set(3);
  lizard.asset.anchor.set(0.2);

  Filter.add(lizard, new Filter.Filter.GlowFilter());

  const floor = entity({ id: 'floor' });
  Physics.addBody(floor, Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));

  const resizeGame = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    resize(screenWidth, screenHeight);
  };
  window.addEventListener('resize', resizeGame);
  resizeGame();

  const textEntity = entity(
    {
      x: 50,
      y: 50,
    },
  );

  Text.show(
    textEntity,
    {
      text: 'Testing scaling!',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'white',
      },
    },
  );

  const createBox = () => {
    const box = entity({ id: 'box', width: 100, height: 100 });
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
  };
  createBox();
});
