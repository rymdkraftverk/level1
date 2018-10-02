import l1 from 'l1';
import config from './emitter.json';

const lizardRotation = () => ({
  timer: Timer.create({ duration: 120 }),
  textures: {
    front: ['lizardFront1', 'lizardFront2'],
    right: ['Samurai-move-1', 'Samurai-move-2'],
  },
  onComplete: (b, e) => {
    const animation = Animation.play(e, {
      textures: b.textures.right,
    });
    animation.scale.set(2);
    animation.anchor.set(0.2);
  },
});

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
      entity.asset.x -= 3;
      if (entity.asset.x < start) {
        data.direction = direction.RIGHT;
      }
    } else if (data.direction === direction.RIGHT) {
      entity.asset.x += 10;
      if (entity.asset.x > end) {
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

const WIDTH = 600;
const HEIGHT = 400;

l1.init({
  width: WIDTH,
  height: HEIGHT,
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
  });

  l1.container();

  const helloText = l1.text(
    {
      text: 'Hello!',
      style: {
        fontFamily: 'Arial',
        fontSize: 4,
        fill: 'white',
      },
      id: 'text',
      parent: square,
    },
  );

  helloText.asset.x = 0;
  helloText.asset.y = 0;

  l1.scaleText(
    helloText.asset.style.fontSize + 30,
    helloText,
  );

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
        textures: ['square', 'particle'],
        zIndex: 1,
        config: Object.assign(
          config,
          {
            pos: {
              x: square.asset.x,
              y: square.asset.y,
            },
          },
        ),
      });

      l1.destroy(e);
    },
  });
  l1.addBehavior(selfdestruct(), square);

  const lizard = l1.animation({
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
  lizard.asset.x = 200;
  lizard.asset.y = 50;

  const moveB = l1.addBehavior(move(100, 500));
  moveB(lizard);
  l1.addBehavior(onCompleteTest(), lizard);

  l1.addFilter(new l1.Filter.GlowFilter(), lizard);

  const floor = l1.container({ id: 'floor' });
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

  const testingScalingText = l1.text(
    {
      text: 'Testing scaling!',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'white',
      },
    },
  );

  testingScalingText.asset.x = 50;
  testingScalingText.asset.y = 50;

  const createShape = () => {
    const { asset: shapeGraphics } = l1.graphics({
      id: 'shape',
      zIndex: 10,
      parent: lizard,
    });

    shapeGraphics.x = 20;
    shapeGraphics.y = 20;

    shapeGraphics.scale.set(0.3);

    shapeGraphics
      .beginFill(0xFF3300)
      .lineStyle(4, 0xffd900, 1)
      .moveTo(0, 0)
      .lineTo(250, 50)
      .lineTo(100, 100)
      .lineTo(0, 0)
      .endFill();
  };
  createShape();
});
