import '@babel/polyfill';
import uuid from 'uuid/v4';
import { Howl } from 'howler';

let displayObjects = [];
let behaviors = [];
let _app;

let ratio = 1;
let gameWidth;
let gameHeight;

// TODO: Check if the same id already exists
export const add = (
  displayObject,
  {
    parent = _app.stage,
    zIndex = null,
    id = `do-${uuid()}`,
    labels = [],
  } = {
    parent: _app.stage,
    zIndex: null,
    id: `do-${uuid()}`,
    labels: [],
  },
) => {
  parent.addChild(displayObject);
  displayObjects = displayObjects.concat(displayObject);

  displayObject._l1 = {
    id,
    zIndex,
    labels,
  };

  /*
    This is done to counteract a potential scale change on the canvas. Since changing the scale
    of a text object will make it blurry.

    This can be removed when Pixi makes it possible to scale text objects.
  */
  if (displayObject.text) {
    displayObject._l1.originalSize = displayObject.style.fontSize;
    displayObject.scale.set(1 / ratio);
  }

  if (zIndex) {
    updateRenderLayers(parent);
  }
};

export const get = (id) => displayObjects.find(displayObject => displayObject._l1.id === id);

export const getAll = () => displayObjects;

export const remove = (id) => {
  displayObjects = displayObjects.filter(displayObject => displayObject._l1.id !== id);
};

export const init = (app) => {
  app.ticker.add(update);

  gameWidth = app.renderer.width;
  gameHeight = app.renderer.height;

  _app = app;
};

const update = (delta) => {
  behaviors.forEach((behavior) => {
    const {
      data,
    } = behavior;

    if (!behavior.initHasBeenCalled) {
      if (behavior.onInit) {
        behavior.onInit({ data });
      }
      behavior.initHasBeenCalled = true;
    }

    if (!behavior.enabled) {
      return;
    }

    if (behavior.onUpdate) {
      behavior.onUpdate({
        counter: behavior.counter,
        data,
        delta,
      });
    }

    if (behavior.duration > 0 && behavior.counter === behavior.duration && !behavior.finished) {
      behavior.finished = true;
      if (behavior.onComplete) {
        behavior.onComplete({ data });
      }
      if (behavior.loop) {
        resetBehavior(behavior);
      } else if (behavior.removeOnComplete) {
        removeBehavior(behavior);
      }
    }

    behavior.counter += 1;
  });
};

export const removeBehavior = (behavior) => {
  if (typeof behavior === 'string') {
    behavior = getBehavior(behavior);
  }
  if (!behavior) {
    console.warn(`level1: Tried to remove non-existent behavior: ${behavior}`);
  } else {
    behaviors = behaviors.filter((b) => b.id !== behavior.id);
    behavior.enabled = false;
    if (behavior.onRemove) {
      behavior.onRemove({ data: behavior.data });
    }
  }
};

export const getAllBehaviors = () => behaviors;

export const getBehavior = (id) => behaviors.find((behavior) => behavior.id === id);

export const getBehaviorByLabel = (label) => behaviors
  .filter((behavior) => behavior.labels.includes(label));

export const resetBehavior = (behavior) => {
  if (typeof behavior === 'string') {
    behavior = getBehavior(behavior);
  }
  if (!behavior) {
    console.warn(`level1: Tried to reset non-existent behavior: ${behavior}`);
  } else {
    behavior.counter = 0;
    behavior.finished = false;
  }
};

function behaviorExists(id) {
  return behaviors.some((behavior) => behavior.id === id);
}

export const addBehavior = (
  {
    id = `behavior-${uuid()}`,
    labels = [],
    duration = 0,
    loop = false,
    removeOnComplete = true,
    onUpdate = null,
    onComplete = null,
    onInit = null,
    onRemove = null,
    enabled = true,
    data = {},
    ...unknownProperties
  },
) => {
  if (behaviorExists(id)) {
    console.warn(`level1: Behavior with id ${id} already exists`);
    removeBehavior(id);
  }

  if (Object.keys(unknownProperties).length > 0) {
    console.warn(`level1: Unknown properties on behavior "${id}": ${Object.keys(unknownProperties)}`);
  }

  const newBehaviorObject = {
    id,
    labels,
    data,
    finished: false,
    counter: 0,
    duration,
    initHasBeenCalled: false,
    loop,
    removeOnComplete,
    onComplete,
    enabled,
    onInit,
    onUpdate,
    onRemove,
  };

  behaviors = behaviors.concat(newBehaviorObject);
};

export function getTexture(filename) {
  const {
    resources,
  } = _app.loader;

  const texture = Object
    .values(resources)
    .filter(resource => resource.textures)
    .flatMap(resource => Object.entries(resource.textures))
    .find(([key]) => key === `${filename}.png`);

  if (!texture) throw new Error(`level1: Texture "${filename}" not found.`);

  return texture[1];
}

// export const getTexture = (asset) => _app.loader.resources[asset].texture;

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
  displayObjects
    .forEach((displayObject) => {
      if (displayObject.text) {
        displayObject.style.fontSize = displayObject._l1.originalSize * ratio;
        displayObject.scale.set(1 / ratio);
      }
    });
};

export const destroy = (displayObject, options = {}) => {
  if (typeof displayObject === 'string') {
    displayObject = get(displayObject);
  }
  if (!displayObject) {
    console.warn(`level1: Tried to remove non-existent displayObject: ${displayObject}`);
  } else {
    remove(displayObject._l1.id);
    if (displayObject.parent) {
      displayObject.parent.removeChild(displayObject);
    }
    displayObject.destroy(options);
  }
};

export const updateRenderLayers = (displayObject) => {
  displayObject.children.sort((a, b) => {
    a._l1.zIndex = a._l1.zIndex || 0;
    b._l1.zIndex = b._l1.zIndex || 0;
    return a._l1.zIndex - b._l1.zIndex;
  });
};

export const loadAssetsFromServer = (path) => new Promise((resolve) => {
  fetch(`/${path}`)
    .then(data => data.text())
    .then(async html => {
      // Create a dom element from the response in order to find the right node
      const el = document.createElement('html');
      el.innerHTML = html;
      const inAssetFolder = [...el.querySelectorAll(`a[href^='/${path}']`)];
      if (inAssetFolder.length > 0) {
        const { loader } = _app;
        let subFolders = [];

        inAssetFolder
          .map((f) => f.innerHTML)
          .forEach((fileName) => {
            if (fileName === '../') {
              return;
            }

            // Check if the fileName is a folder
            if (fileName.lastIndexOf('/') === fileName.length - 1) {
              subFolders = subFolders.concat(fileName.substring(0, fileName.length - 1));
              // Else we have a file that we should load
            } else {
              const name = fileName.substring(0, fileName.lastIndexOf('.'));
              if (name.length === 0) {
                console.warn(`level1: Asset loader ignoring ${fileName} due to empty file name`);
              } else if (fileName.substring(fileName.lastIndexOf('.'), fileName.length) === '.json') {
                loader.add(`${path}/${fileName}`);
              } else {
                console.warn(`level1: Asset loader ignoring ${fileName} due to only supporting .json files`);
              }
            }
          });
        await Promise.all(subFolders.map((subfolder) => loadAssetsFromServer(`${path}/${subfolder}`)));
        resolve();
      } else {
        console.warn('level1: No assets detected in assets folder');
        resolve();
      }
    });
});

// function syncEntityBodyPosition(entity) {
//   entity.asset.x = entity.body.position.x;
//   entity.asset.y = entity.body.position.y;
// }

export const toRadians = angle => angle * (Math.PI / 180);

export const grid = ({
  x, y, marginX, marginY, itemsPerRow,
}) => (index) => {
  const row = Math.floor(index / itemsPerRow);
  const column = index % itemsPerRow;
  return {
    x: x + (column * marginX),
    y: y + (row * marginY),
  };
};

export const getRandomInRange = (from, to) => Math.floor((Math.random() * (to - from)) + from);

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
    const { x, y } = displayObject._l1.dragData.getLocalPosition(displayObject.parent);
    onDragMove({ x, y });
  }
};

const onDragStartInternal = (displayObject, onDragStart, disabler) => (event) => {
  if (disabler()) {
    return;
  }

  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  displayObject._l1.dragData = event.data;
  displayObject.dragging = true;

  const { x, y } = displayObject._l1.dragData.getLocalPosition(displayObject.parent);

  onDragStart({ x, y });
};

const onDragEndInternal = (displayObject, onDragEnd, disabler) => () => {
  if (disabler()) {
    return;
  }

  const { x, y } = displayObject._l1.dragData.getLocalPosition(displayObject.parent);

  onDragEnd({ x, y });

  displayObject.dragging = false;
  displayObject._l1.dragData = null;
};

// makeDraggable end

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

export const convertColorHex = color => `0x${color.substring(1, color.length)}`;

export const distance = ({
  x1, y1, x2, y2,
}) => Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1));

/*
  This is required to be used for any scale change of Text
*/
export const scaleText = (displayObject, fontSize) => {
  displayObject._l1.originalSize = fontSize;
  displayObject.style.fontSize = fontSize * ratio;
};

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

export const displayHitBoxes = (displayObject, graphics) => ({
  onUpdate: () => {
    const width = getWidth(displayObject);
    const height = getHeight(graphics);

    const { x, y } = getGlobalPosition(displayObject, ratio);

    graphics
      .lineStyle(2, 0xFFFFFF, 1)
      .moveTo(x, y)
      .lineTo(x + width, y)
      .lineTo(x + width, y + height)
      .lineTo(x, y + height)
      .lineTo(x, y);
  },
});

/*
  Check Howler docs for available options
*/
const getSound = (filePath, options) => new Howl({
  src: [filePath],
  ...options,
});

export const sound = (options) => {
  const {
    src,
    volume,
    loop,
  } = options;

  const _sound = getSound(src, { volume, loop });

  _sound.play();

  return _sound;
};

// LABELS

export const addLabel = (displayObject, label) => {
  displayObject._l1.labels = displayObject._l1.labels.concat(label);
};

export const removeLabel = (displayObject, label) => {
  displayObject._l1.labels = displayObject._l1.labels.filter(_label => _label !== label);
};

export const getByLabel = (label) => displayObjects
  .filter(displayObject => displayObject._l1.labels.includes(label));
