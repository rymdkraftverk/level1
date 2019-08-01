import * as PIXI from 'pixi.js';
import _ from 'lodash/fp';
import 'pixi-particles';
import * as l1 from 'l1';
import config from './emitter.json';

const Direction = {
  LEFT: 'left',
  RIGHT: 'right',
};

const WIDTH = 600;
const HEIGHT = 400;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  clearBeforeRender: false,
});

document.body.appendChild(app.view);

l1.init(app, {
  debug: true,
  logging: true,
  onError: () => {
    console.log('onError callback called');
  },
});

const displaySquare = ({ x, y, container }) => {
  const square = new PIXI.Sprite(
    l1.getTexture('square'),
  );

  square.name = 'square';
  square.x = x;
  square.y = y;

  app.stage.addChild(square);

  const selfdestruct = toDestroy => () => {
    new PIXI.particles.Emitter(
      container,
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
    ).playOnceAndDestroy();

    toDestroy.destroy();
  };
  const selfdestructBehavior = l1.once(selfdestruct(square), 120);
  selfdestructBehavior.labels = ['testLabel'];
};

const move = (object, start, end) => {
  let direction = Direction.LEFT;
  /* eslint-disable no-param-reassign */
  return () => {
    if (direction === Direction.LEFT) {
      object.x -= 1;
      if (object.x < start) {
        direction = Direction.RIGHT;
      }
    } else if (direction === Direction.RIGHT) {
      object.x += 1;
      if (object.x > end) {
        // l1.remove('move');
        object.filters = null;
      }
    }
  };
};
/* eslint-enable no-param-reassign */

const onCompleteTest = () => {
  console.log('COMPLETE!');
};

const resizeGame = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  l1.resize(screenWidth, screenHeight);
};
window.addEventListener('resize', resizeGame);
resizeGame();

const init = () => {
  const particleContainer = new PIXI.Container();
  app.stage.addChild(particleContainer);

  const AMOUNT_OF_SQUARES = 70;

  _.times(() => {
    const x = l1.getRandomInRange(10, 600);
    const y = l1.getRandomInRange(10, 600);
    displaySquare({ x, y, container: particleContainer });
  },
  AMOUNT_OF_SQUARES);

  console.log(`Should be ${AMOUNT_OF_SQUARES}: `, l1.getByLabel('testLabel'));

  // l1.sound({
  //   src: './sounds/join3.wav',
  //   volume: 0.2,
  // });

  const textContainer = new PIXI.Container();
  app.stage.addChild(textContainer);

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

  l1.displayHitBoxes(helloText, new PIXI.Graphics());
  textContainer.addChild(helloText);

  // // TODO
  // l1.scaleText(
  //   helloText,
  //   helloText.style.fontSize + 30,
  // );

  // Test that removing a behavior that does not exist doesn't crash
  l1.remove('doesNotExist');

  const lizardContainer = new PIXI.Container();
  app.stage.addChild(lizardContainer);

  const lizard = new PIXI.extras.AnimatedSprite(
    [
      'samurai/attack/samurai-attack-1',
      'samurai/attack/samurai-attack-1',
      'samurai/attack/samurai-attack-1',
      'samurai/attack/samurai-attack-1',
      'samurai/attack/samurai-attack-2',
      'samurai/attack/samurai-attack-3',
      'samurai/attack/samurai-attack-4',
      'samurai/attack/samurai-attack-5',
      'samurai/attack/samurai-attack-6',
      'samurai/attack/samurai-attack-7',
      'samurai/attack/samurai-attack-7',
      'samurai/attack/samurai-attack-7',
      'samurai/attack/samurai-attack-7',
      'samurai/attack/samurai-attack-8',
      'samurai/attack/samurai-attack-8',
      'samurai/attack/samurai-attack-8',
    ].map(l1.getTexture),
  );

  lizard.hitArea = new PIXI.Rectangle(0, 0, 32, 32);

  lizard.animationSpeed = 0.4;
  lizard.x = 200;
  lizard.y = 50;
  lizard.scale.set(3);
  lizard.play();

  app.stage.addChild(lizard);

  const moveBehavior = l1.repeat(move(lizard, 1, 700));
  moveBehavior.id = 'move';
  l1.displayHitBoxes(lizard, new PIXI.Graphics());

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

  l1.once(
    onCompleteTest, 20,
  );

  const testCompleteAndRemove = l1.once(() => {
    // l1.remove(testCompleteAndRemove);
    console.log('This should be logged only once');
    throw new Error('Game should keep going when errors are thrown from behaviors');
  }, 5);

  const createSine = ({
    start, end, speed,
  }) => (t) => {
    const middle = ((start + end) / 2);
    return middle + ((middle - start) * Math.sin((t * Math.PI * 2) / speed));
  };


  const testingScalingText = new PIXI.extras.BitmapText(
    'BitmapText!',
    {
      font: 'ArialB',
    },
  );

  testingScalingText.x = 50;
  testingScalingText.y = 250;

  app.stage.addChild(testingScalingText);

  const normalText = new PIXI.Text(
    'Normal text!',
    {
      fontFamily: 'Arial',
      fontSize: 30,
      fill: 'white',
    },
  );

  normalText.x = 50;
  normalText.y = 170;

  app.stage.addChild(normalText);

  const textMovement = (text) => {
    const sine = createSine({
      start: 1,
      end: 1.2,
      speed: 100,
    });
    return (counter) => {
      const scale = sine(counter);
      text.scale.set(scale);
    };
  };

  l1.repeat(textMovement(testingScalingText));
  l1.repeat(textMovement(normalText));

  const createShape = () => {
    const shape = new PIXI.Graphics();
    lizard.addChild(shape);

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

  const key = 'a';
  l1.addKey(key);
  l1.repeat(() => {
    if (l1.isKeyDown(key)) {
      console.log('pressing a');
    }
  });

  console.log('Children', l1.getChildren(app.stage).length);
};

app.loader.add('assets/spritesheet.json');
app.loader.add('assets/arialbitmap.fnt');
app.loader.load(init);
