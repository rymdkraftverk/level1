import * as PIXI from 'pixi.js';
import _ from 'lodash/fp';
import 'pixi-particles';
// import * as filters from 'pixi-filters';
import * as l1 from 'l1';
import config from './emitter.json';

const direction = {
  LEFT: 'left',
  RIGHT: 'right',
};

const displaySquare = ({ x, y }) => {
  const square = new PIXI.Sprite(
    l1.getTexture('square'),
  );

  square.name = 'square';
  square.x = x;
  square.y = y;

  l1.add(square);

  const particleContainer = new PIXI.Container();
  l1.add(particleContainer, {
    zIndex: 10,
    id: 'particleContainer',
  });

  const selfdestruct = toDestroy => ({
    duration: 120,
    data: {
      test: 'test',
    },
    removeOnComplete: true,
    onComplete: () => {
      // eslint-disable-next-line no-new
      new PIXI.particles.Emitter(
        particleContainer,
        [
          l1.getTexture('square'),
          l1.getTexture('particles/particle'),
        ],
        Object.assign(
          config,
          {
            pos: {
              x: toDestroy
                .toGlobal(new PIXI.Point(0, 0)).x / l1.getScale(),
              y: toDestroy
                .toGlobal(new PIXI.Point(0, 0)).y / l1.getScale(),
            },
          },
        ),
      );
      l1.destroy(toDestroy);
    },
  });
  l1.addBehavior(selfdestruct(square));
};

/* eslint-disable no-param-reassign */
const move = (object, start, end) => ({
  id: 'move',
  data: {
    direction: direction.LEFT,
  },
  onRemove: () => {
    object.filters = null;
  },
  onUpdate: ({ data }) => {
    if (data.direction === direction.LEFT) {
      object.x -= 3;
      if (object.x < start) {
        data.direction = direction.RIGHT;
      }
    } else if (data.direction === direction.RIGHT) {
      object.x += 10;
      if (object.x > end) {
        l1.removeBehavior('move');
      }
    }
  },
});
/* eslint-enable no-param-reassign */

const onCompleteTest = () => ({
  duration: 20,
  onComplete: () => {
    console.log('COMPLETE!');
  },
});

const WIDTH = 600;
const HEIGHT = 400;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  clearBeforeRender: false,
});

document.body.appendChild(app.view);

l1.init(app);

const resizeGame = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  l1.resize(screenWidth, screenHeight);
};
window.addEventListener('resize', resizeGame);
resizeGame();

const init = () => {
  _.times(() => {
    const x = l1.getRandomInRange(10, 600);
    const y = l1.getRandomInRange(10, 600);
    displaySquare({ x, y });
  },
  500);
  // l1.addBody(
  //   square,
  //   l1.Matter.Bodies.rectangle(140, 50, 80, 80, {
  //     inertia: Infinity,
  //   }),
  // );

  l1.sound({
    src: './sounds/join3.wav',
    volume: 0.2,
  });

  const textContainer = new PIXI.Container();
  l1.add(textContainer);

  const helloText = new PIXI.Text(
    'Hello!',
    {
      fontFamily: 'Arial',
      fontSize: 50,
      fill: 'white',
    },
  );

  helloText.x = 0;
  helloText.y = 0;

  l1.add(
    helloText,
    {
      parent: textContainer,
    },
  );

  l1.scaleText(
    helloText,
    helloText.style.fontSize + 30,
  );

  // Test that removing a behavior that does not exist doesn't crash
  l1.removeBehavior('doesNotExist');

  const lizardContainer = new PIXI.Container();
  l1.add(lizardContainer);

  const lizard = new PIXI.extras.AnimatedSprite(
    [
      l1.getTexture('samurai/attack/samurai-attack-1'),
      l1.getTexture('samurai/attack/samurai-attack-1'),
      l1.getTexture('samurai/attack/samurai-attack-1'),
      l1.getTexture('samurai/attack/samurai-attack-1'),
      l1.getTexture('samurai/attack/samurai-attack-2'),
      l1.getTexture('samurai/attack/samurai-attack-3'),
      l1.getTexture('samurai/attack/samurai-attack-4'),
      l1.getTexture('samurai/attack/samurai-attack-5'),
      l1.getTexture('samurai/attack/samurai-attack-6'),
      l1.getTexture('samurai/attack/samurai-attack-7'),
      l1.getTexture('samurai/attack/samurai-attack-7'),
      l1.getTexture('samurai/attack/samurai-attack-7'),
      l1.getTexture('samurai/attack/samurai-attack-7'),
      l1.getTexture('samurai/attack/samurai-attack-8'),
      l1.getTexture('samurai/attack/samurai-attack-8'),
      l1.getTexture('samurai/attack/samurai-attack-8'),
    ],
  );

  lizard.hitArea = new PIXI.Rectangle(0, 0, 32, 32);

  lizard.animationSpeed = 0.4;
  lizard.x = 200;
  lizard.y = 50;
  lizard.scale.set(3);
  // lizard.filters = [
  //   new filters.GlowFilter(),
  // ];
  lizard.play();

  l1.add(lizard, {
    parent: lizardContainer,
    zIndex: 10,
  });

  l1.addBehavior(move(lizard, 100, 500));

  // eslint-disable-next-line no-new
  new PIXI.particles.Emitter(
    lizard,
    [
      l1.getTexture('square'),
      l1.getTexture('particles/particle'),
    ],
    Object.assign(
      config,
      {
        pos: {
          x: 0,
          y: 0,
        },
      },
    ),
  );

  l1.addBehavior(
    onCompleteTest(),
  );

  const behaviorToRemove = () => ({
    id: 'behaviorToRemove',
    onRemove: () => {
      console.log('behavior removed');
    },
  });

  l1.addBehavior(
    behaviorToRemove(),
  );

  l1.removeBehavior(
    'behaviorToRemove',
  );

  l1.addBehavior(
    behaviorToRemove(),
  );

  // const floor = l1.container({ id: 'floor' });
  // console.log('floor', floor);
  // l1.addBody(
  //   floor,
  //   l1.Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }),
  // );

  const testingScalingText = new PIXI.Text(
    'Testing scaling!',
    {
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'white',
    },
  );

  testingScalingText.x = 50;
  testingScalingText.y = 50;

  const createShape = () => {
    const shape = new PIXI.Graphics();
    l1.add(shape, {
      parent: lizard,
      zIndex: 20,
    });

    shape.x = 20;
    shape.y = 20;

    shape.scale.set(0.3);

    shape
      .beginFill(0xFF3300)
      .lineStyle(4, 0xffd900, 1)
      .moveTo(0, 0)
      .lineTo(250, 50)
      .lineTo(100, 100)
      .lineTo(0, 0)
      .endFill();

    l1.makeDraggable(
      shape,
      {
        onDragMove(position) {
          shape.position = position;
        },
      },
    );
  };
  createShape();
};

app.loader.add('assets/spritesheet.json');
app.loader.load(init);

setInterval(() => {
  console.log('FPS: ', Math.ceil(app.ticker.FPS));
}, 1000);
