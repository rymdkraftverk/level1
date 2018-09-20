import l1 from 'l1';
import config from './emitter.json';

// const lizardRotation = () => ({
//   timer: Timer.create({ duration: 120 }),
//   textures: {
//     front: ['lizardFront1', 'lizardFront2'],
//     right: ['Samurai-move-1', 'Samurai-move-2'],
//   },
//   onComplete: (b, e) => {
//     const animation = Animation.play(e, {
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
const move = (start, end) => ({
  id: 'move',
  data: {
    direction: direction.LEFT,
  },
  onUpdate: ({ entity, data }) => {
    if (data.direction === direction.LEFT) {
      entity.x = l1.getX(entity) - 3;
      if (entity.x < start) {
        data.direction = direction.RIGHT;
      }
    } else if (data.direction === direction.RIGHT) {
      entity.x = l1.getX(entity) + 10;
      if (entity.x > end) {
        l1.removeBehavior('move', entity);
      }
    }
  },
});
/* eslint-enable no-param-reassign */

const onCompleteTest = () => ({
  endTime: 20,
  onComplete: () => {
    console.log('COMPLETE!');
  },
});

l1.init({
  width: 600,
  height: 400,
  debug: true,
  physics: true,
  pixi: {
    options: {
      antialias: true,
    },
    settings: {
      SCALE_MODE: l1.PIXI.SCALE_MODES.NEAREST,
    },
  },
}).then(() => {
  l1.getPhysicsEngine().world.gravity.y = 1;

  // createControllerPresets();

  // const input = Entity.addChild(root, { id: 'input' });
  // input.behaviors.scan = scanGamepads();

  const square = l1.sprite({
    id: 'square',
    types: ['square', 'player'],
    texture: 'square',
  });

  square.asset.scale.set(5);
  l1.addFilter(new l1.Filter.GlowFilter(), square);

  l1.addBody(l1.Matter.Bodies.rectangle(140, 50, 80, 80, {
    inertia: Infinity,
  }), square);

  l1.sound({
    src: './sounds/join3.wav',
    volume: 0.2,
    parent: square,
  });

  l1.entity();

  const helloText = l1.text(
    {
      text: 'Hello!',
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'white',
      },
      id: 'text',
      x: -50,
      y: -50,
      parent: square,
    },
  );

  helloText.asset.scale.set(0.1);

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

  const scaleTextBehavior = () => ({
    onUpdate: ({ counter }) => {
      // e.asset.scale.set(e.asset.scale.x * 1.005);
      // Text.scale(e, e.asset.style.fontSize + 0.0001);
    },
  });
  l1.scaleText(
    helloText.asset.style.fontSize + 100,
    helloText,
  );
  l1.addBehavior(scaleTextBehavior(), helloText);

  // Test that removing a behavior that does not exist doesn't crash
  l1.removeBehavior('doesNotExist', helloText);

  const selfdestruct = () => ({
    endTime: 120,
    data: {
      test: 'test',
    },
    removeOnComplete: true,
    onComplete: ({ entity: e }) => {
      l1.particles({
        x: l1.getX(square),
        y: l1.getY(square),
        textures: ['square', 'particle'],
        config,
        zIndex: 1,
      });
      l1.destroy(e);
    },
  });
  l1.addBehavior(selfdestruct(), square);

  const lizard = l1.animation({
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
  });
  lizard.asset.animationSpeed = 0.4;

  const moveB = l1.addBehavior(move(100, 500));
  moveB(lizard);
  l1.addBehavior(onCompleteTest(), lizard);

  // lizard.behaviors.lizardRotation = lizardRotation();
  // lizard.behaviors.checkCollision = checkCollision();
  // lizard.behaviors.lizardMove = lizardMove(100, 450);

  lizard.asset.scale.set(3);
  lizard.asset.anchor.set(0.2);

  l1.addFilter(new l1.Filter.GlowFilter(), lizard);

  const floor = l1.entity({ id: 'floor' });
  l1.addBody(
    l1.Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }),
    floor,
  );

  const resizeGame = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    l1.resize(screenWidth, screenHeight);
  };
  window.addEventListener('resize', resizeGame);
  resizeGame();

  l1.text(
    {
      text: 'Testing scaling!',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'white',
      },
      x: 50,
      y: 50,
    },
  );

  const createShape = () => {
    const { asset: shapeGraphics } = l1.graphics({
      id: 'shape',
      width: 100,
      height: 100,
      x: 300,
      y: 200,
      zIndex: 10,
    });

    // set a fill and line style
    shapeGraphics.beginFill(0xFF3300);
    shapeGraphics.lineStyle(4, 0xffd900, 1);

    // draw a shape
    shapeGraphics.moveTo(50, 50);
    shapeGraphics.lineTo(250, 50);
    shapeGraphics.lineTo(100, 100);
    shapeGraphics.lineTo(50, 50);
    shapeGraphics.endFill();
  };
  createShape();
});
