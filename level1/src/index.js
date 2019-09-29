import 'core-js/es/array/flat-map';
import Mousetrap from 'mousetrap';

const DEBUG_BEHAVIOR_ID_PRINT = '_internal_l1_debug_info_print';
const DEBUG_BEHAVIOR_ID_COLLECT = '_internal_l1_debug_info_collect';

const behaviors = [];
let behaviorsToAdd = [];
let behaviorsToRemove = [];
let _app;
let ratio = 1;
let gameWidth;
let gameHeight;
let lastTimeStamp = null;
let _logging = false;

const BehaviorType = {
  ONCE: 'once',
  REPEAT: 'repeat',
};

const log = (text) => {
  if (_logging) {
    // eslint-disable-next-line no-console
    console.warn(text);
  }
};

export const init = (app, options = {}) => {
  const {
    debug = false,
    logging = false,
    onError = () => {},
  } = options;
  app.ticker.add(update(onError));

  gameWidth = app.renderer.width;
  gameHeight = app.renderer.height;

  _app = app;

  if (debug) {
    createDebugInformation();
  }
  _logging = logging;
};

export const getLoopDuration = () => lastTimeStamp;

// TODO: Decide where to put this
// TODO: Filter out debug behaviors
const createDebugInformation = () => {
  if (!_app) {
    throw new Error('l1.init has not been called');
  }

  const container = document.createElement('div');
  document.body.appendChild(container);
  container.style.backgroundColor = 'rgba(0,0,0,0.5)';
  container.style.position = 'absolute';
  container.style.top = '0px';
  container.style.zIndex = 1;
  container.style.color = 'white';

  let timeStamps = [];

  const printDebugInformation = repeat(() => {
    const averageLoopDuration = timeStamps
      .reduce((acc, ts) => acc + ts, 0)
        / timeStamps.length;
    container
      .innerHTML = `fps: ${Math.ceil(_app.ticker.FPS)}, b: ${getAll().length}, do: ${getChildren(_app.stage).length} Loop duration: ${averageLoopDuration.toFixed(5)}`;
    timeStamps = [];
  }, 30);

  printDebugInformation.id = DEBUG_BEHAVIOR_ID_PRINT;

  const collectDebugInformation = repeat(() => {
    timeStamps.push(lastTimeStamp);
  });

  collectDebugInformation.id = DEBUG_BEHAVIOR_ID_COLLECT;
};

const update = (onError) => (deltaTime) => {
  try {
    const before = performance.now();
    behaviors.forEach((behavior) => {
      behavior.counter += 1;
      if (behavior.type === BehaviorType.ONCE) {
        if (behavior.counter === behavior.delay) {
          behavior.callback();
          behaviorsToRemove.push(behavior);
        }
      } else if (behavior.type === BehaviorType.REPEAT) {
        if (behavior.counter % behavior.interval === 0) {
          behavior.callback(behavior.counter, deltaTime);
        }
      }
    });

    behaviorsToRemove.forEach((behaviorToRemove) => {
      // Mutate original array for performance reasons
      const indexToRemove = behaviors.indexOf(behaviorToRemove);
      if (indexToRemove >= 0) {
        behaviors.splice(indexToRemove, 1);
      }
    });

    behaviorsToRemove = [];

    behaviorsToAdd.forEach((behaviorToAdd) => {
      behaviors.push(behaviorToAdd);
    });

    behaviorsToAdd = [];

    const after = performance.now();
    lastTimeStamp = after - before;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('l1: Error running behaviors:', error);
    onError(error);
  }
};

const commonBehaviorProperties = {
  id: null,
  labels: [],
  counter: 0,
};

export const once = (callback, delay = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.once needs to be a function');
  }
  const behavior = {
    callback,
    delay,
    type: BehaviorType.ONCE,
    ...commonBehaviorProperties,
  };
  behaviorsToAdd.push(behavior);
  return behavior;
};

export const repeat = (callback, interval = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.repeat needs to be a function');
  }
  const behavior = {
    callback,
    interval,
    type: BehaviorType.REPEAT,
    ...commonBehaviorProperties,
  };
  behaviorsToAdd.push(behavior);
  return behavior;
};

export const remove = (behavior) => {
  let behaviorObject;
  if (typeof behavior === 'string') {
    behaviorObject = get(behavior);
  } else {
    behaviorObject = behavior;
  }
  if (!behaviorObject) {
    log(`level1: Tried to remove non-existent behavior: ${behavior}`);
  } else {
    behaviorsToRemove.push(behaviorObject);
  }
};

export const get = (id) => behaviors.find((behavior) => behavior.id === id);

export const getAll = () => behaviors;

export const getByLabel = (label) => behaviors
  .filter((behavior) => behavior.labels.includes(label));

export const reset = (behavior) => {
  if (typeof behavior === 'string') {
    behavior = get(behavior);
  }
  if (!behavior) {
    log(`level1: Tried to reset non-existent behavior: ${behavior}`);
  } else {
    behavior.counter = 0;
  }
};

export const exists = (id) => behaviors.some((behavior) => behavior.id === id);

// Pixi utils

export const getTexture = (filename) => {
  if (!_app) {
    throw new Error('l1.init has not been called');
  }
  const texture = Object
    .values(_app.loader.resources)
    .filter(resource => resource.textures)
    .flatMap(resource => Object.entries(resource.textures))
    .find(([key]) => key === `${filename}.png`);

  if (!texture) throw new Error(`level1: Texture "${filename}" not found.`);

  return texture[1];
};

export const getAllTextureIds = () => {
  if (!_app) {
    throw new Error('l1.init has not been called');
  }
  return Object
    .values(_app.loader.resources)
    .filter(resource => resource.textures)
    .flatMap(resource => Object.keys(resource.textures))
    .map(key => key.substring(0, key.length - 4));
};

const getChildren = (displayObject) => {
  if (displayObject.children.length) {
    return displayObject.children.flatMap(getChildren).concat(displayObject);
  }
  return [displayObject];
};

// Idea: Pass all text objects to resize?
export const resize = (width, height) => {
  ratio = Math.min(
    width / gameWidth,
    height / gameHeight,
  );

  _app
    .stage
    .scale
    .set(ratio);

  _app
    .renderer
    .resize(
      gameWidth * ratio,
      gameHeight * ratio,
    );

  /*
      The following code is needed to counteract the scale change on the whole canvas since
      texts get distorted by PIXI when you try to change their scale.
      Texts instead change size by setting their fontSize.
    */
  getChildren(_app.stage)
    // Keep if resizable text object 
    .filter(c => c.originalFontSize)
    .forEach((displayObject) => {
      displayObject.style.fontSize = displayObject.originalFontSize * ratio;
      displayObject.scale.set(1 / ratio);
    });
};

export const makeResizable = (textObject) => {
  // This will break typechecking
  textObject.originalFontSize = textObject.style.fontSize;
  textObject.style = {
    ...textObject.style,
    fontSize: textObject.style.fontSize * ratio,
  };
  textObject.scale.set(1 / ratio);
};

// makeDraggable
const startEvents = [
  'mousedown',
  'touchstart',
];

const endEvents = [
  'pointerup',
  'pointerupoutside',
];

const moveEvents = [
  'pointermove',
];

const noop = () => {};

export const makeDraggable = (displayObject, options = {}) => {
  const {
    onDragStart = noop,
    onDragEnd = noop,
    onDragMove = noop,
    disabler = () => false,
  } = options;

  displayObject.interactive = true;

  startEvents.forEach((event) => {
    displayObject.on(event, onDragStartInternal(displayObject, onDragStart, disabler));
  });

  endEvents.forEach((event) => {
    displayObject.on(event, onDragEndInternal(displayObject, onDragEnd, disabler));
  });

  moveEvents.forEach((event) => {
    displayObject.on(event, onDragMoveInternal(displayObject, onDragMove, disabler));
  });
};

const onDragMoveInternal = (displayObject, onDragMove, disabler) => () => {
  if (disabler()) {
    return;
  }

  if (displayObject.dragging) {
    const { x, y } = displayObject.l1.dragData.getLocalPosition(displayObject.parent);
    onDragMove({ x, y });
  }
};

const onDragStartInternal = (displayObject, onDragStart, disabler) => (event) => {
  if (disabler()) {
    return;
  }

  displayObject.l1.dragData = event.data;
  displayObject.dragging = true;

  const { x, y } = displayObject.l1.dragData.getLocalPosition(displayObject.parent);

  onDragStart({ x, y });
};

const onDragEndInternal = (displayObject, onDragEnd, disabler) => () => {
  if (disabler() || !displayObject.l1.dragData) {
    return;
  }

  const { x, y } = displayObject.l1.dragData.getLocalPosition(displayObject.parent);

  onDragEnd({ x, y });

  displayObject.dragging = false;
  displayObject.l1.dragData = null;
};

// makeDraggable end

const CLICK_EVENTS = ['click', 'tap']

export const makeClickable = (displayObject, onClick) => {
  // eslint-disable-next-line no-param-reassign
  displayObject.interactive = true
  // eslint-disable-next-line no-param-reassign
  displayObject.cursor = 'pointer'

  CLICK_EVENTS.forEach((event) => {
    displayObject.on(event, () => {
      // eslint-disable-next-line no-param-reassign
      displayObject.cursor = 'default'
      onClick()
    })
  })
}

// TODO: Rename to getGameScale
export const getScale = () => ratio;

export const angle = ({
  x1, y1, x2, y2,
}) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  let _angle = Math.atan(yDistance / xDistance);
  if (x1 - x2 < 0) {
    _angle += Math.PI;
  }
  return _angle;
};

// Convert #ff00ff to 0xff00ff
export const fromHex = color => `0x${color.substring(1, color.length)}`;


export const getGlobalPosition = (displayObject) => {
  const global = displayObject.toGlobal({ x: 0, y: 0 });

  return {
    x: global.x / ratio,
    y: global.y / ratio,
  };
};

const getWidth = (displayObject) => (displayObject.hitArea && displayObject.hitArea.width)
  || displayObject.width;
const getHeight = (displayObject) => (displayObject.hitArea && displayObject.hitArea.height)
  || displayObject.height;

export const isColliding = (displayObject, otherDisplayObject) => {
  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(displayObject);

  const entityWidth = getWidth(displayObject);
  const entityHeight = getHeight(displayObject);

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherDisplayObject);

  const otherEntityWidth = getWidth(otherDisplayObject);
  const otherEntityHeight = getHeight(otherDisplayObject);

  return (entityX + entityWidth >= otherEntityX
    && otherEntityX + otherEntityWidth >= entityX
    && entityY + entityHeight >= otherEntityY
    && otherEntityY + otherEntityHeight >= entityY);
};

export const getOverlappingArea = (displayObject, otherDisplayObject) => {
  if (!isColliding(displayObject, otherDisplayObject)) {
    return 0;
  }

  const {
    x: entityX,
    y: entityY,
  } = getGlobalPosition(displayObject);

  const entityWidth = getWidth(displayObject);
  const entityHeight = getHeight(displayObject);

  const {
    x: otherEntityX,
    y: otherEntityY,
  } = getGlobalPosition(otherDisplayObject);

  const otherEntityWidth = getWidth(otherDisplayObject);
  const otherEntityHeight = getHeight(otherDisplayObject);

  const minX = Math.max(entityX, otherEntityX);
  const maxX = Math.min(entityX + entityWidth, otherEntityX + otherEntityWidth);
  const dX = maxX - minX;

  const minY = Math.max(entityY, otherEntityY);
  const maxY = Math.min(entityY + entityHeight, otherEntityY + otherEntityHeight);
  const dY = maxY - minY;

  return dX * dY;
};

export const drawHitArea = (displayObject, graphics) => {
  if (!_app) {
    throw new Error('l1.init has not been called');
  }
  _app.stage.addChild(graphics);
  const behavior = repeat(() => {
    // TODO: Check if not destroyed
    if (!displayObject._destroyed) {
      const width = getWidth(displayObject);
      const height = getHeight(displayObject);

      const { x, y } = getGlobalPosition(displayObject, ratio);

      graphics
        .clear()
        .lineStyle(2, 0xFFFFFF, 1)
        .moveTo(x, y)
        .lineTo(x + width, y)
        .lineTo(x + width, y + height)
        .lineTo(x, y + height)
        .lineTo(x, y);
    }
  });
  behavior.id = displayObject.name ? `${displayObject.name}-drawHitArea` : null;
};


// TODO: Deprecate
/* Keyboard input */
const pressed = {};

export function isKeyDown(keyCode) {
  return pressed[keyCode];
}

function onKeyDown(event) {
  pressed[event] = true;
}

function onKeyUp(event) {
  pressed[event] = false;
}

export function addKey(key) {
  Mousetrap.bind(key, () => {
    onKeyDown(key);
  }, 'keydown');
  Mousetrap.bind(key, () => {
    onKeyUp(key);
  }, 'keyup');
}
