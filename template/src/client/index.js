import {
  Game,
  Entity,
  Timer,
  Physics,
  Text,
  Matter,
  Sprite,
  Particles,
  Animation,
  Sound,
  Graphics,
  PIXI,
  Filter,
  Behavior,
} from 'l1';
import config from './emitter.json';

const lizardRotation = () => ({
  timer: Timer.create({ duration: 120 }),
  speed: 0.075,
  textures: {
    front: ['lizardFront1', 'lizardFront2'],
    right: ['Samurai-move-1', 'Samurai-move-2'],
  },
  onTimerEnd: (b, e) => {
    const animation = Animation.play(e, {
      speed: b.speed,
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
const lizardMove = (start, end) => ({
  direction: direction.LEFT,
  onUpdate: (b, e) => {
    if (b.direction === direction.LEFT) {
      e.x = Entity.getX(e) - 3;
      if (e.x < start) {
        b.direction = direction.RIGHT;
      }
    } else if (b.direction === direction.RIGHT) {
      e.x = Entity.getX(e) + 10;
      if (e.x > end) {
        b.direction = direction.LEFT;
      }
    }
  },
});
/* eslint-enable no-param-reassign */

const root = Entity.getRoot();

Game.init({
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
  Physics.getEngine().world.gravity.y = 1;

  // createControllerPresets();

  // const input = Entity.addChild(root, { id: 'input' });
  // input.behaviors.scan = scanGamepads();

  const square = Entity.addChild(root, { id: 'square', types: ['square', 'player'] });

  Sprite.show(square, { texture: 'square' });
  square.asset.scale.set(5);
  Filter.add(square, Filter.Filter.GlowFilter);

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

  // const scaleText = () => ({
  //   run: (b, e) => {
  //     // e.asset.scale.set(e.asset.scale.x * 1.005);
  //     // Text.scale(e, e.asset.style.fontSize + 0.0001);
  //   },
  // });
  // Text.scale(text, text.asset.style.fontSize + 100);
  // Behavior.add(text, scaleText());

  const selfdestruct = () => ({
    timer: 120,
    data: {
      test: 'test',
    },
    removeOnComplete: true,
    onUpdate: ({ data, entity, counter }) => {
      console.log('onUpdate', counter);
    },
    onInit: ({ data, entity }) => {
      console.log('ON INIT', data.test + entity.id);
    },
    onRemove: ({ data, entity }) => {
      console.log('ON REMOVE', data.test + entity.id);
    },
    onTimerEnd: ({ data, entity }) => {
      console.log('ON TIMER END', data.test + entity.id);
      const explosion = Entity.addChild(root, {
        x: Entity.getX(square),
        y: Entity.getY(square),
      });
      Particles.emit(explosion, {
        textures: ['square', 'particle'],
        config,
        zIndex: 1,
      });
      // Entity.destroy(entity);
    },
  });
  Behavior.add(square, selfdestruct());

  const lizard = Entity.addChild(root, {
    x: 300,
    y: 50,
    width: 24,
    height: 24,
  });

  // lizard.behaviors.lizardRotation = lizardRotation();
  // lizard.behaviors.checkCollision = checkCollision();
  // lizard.behaviors.lizardMove = lizardMove(100, 450);

  Animation.play(lizard, {
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
  lizard.asset.scale.set(3);
  lizard.asset.anchor.set(0.2);

  Filter.add(lizard, new Filter.Filter.GlowFilter());

  const floor = Entity.addChild(root, { id: 'floor' });
  Physics.addBody(floor, Matter.Bodies.rectangle(300, 390, 600, 10, { isStatic: true }));

  const resizeGame = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    Game.resize(screenWidth, screenHeight);
  };
  window.addEventListener('resize', resizeGame);
  resizeGame();

  const textEntity = Entity.addChild(
    root,
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
  };
  createBox();
});
