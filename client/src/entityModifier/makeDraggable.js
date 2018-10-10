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

export default (entity, options = {}) => {
  const {
    onDragStart = noop,
    onDragEnd = noop,
    onDragMove = noop,
    disabler = () => false,
  } = options;

  entity.asset.interactive = true;

  startEvents.forEach((event) => {
    entity.asset.on(event, onDragStartInternal(entity, onDragStart, disabler));
  });

  endEvents.forEach((event) => {
    entity.asset.on(event, onDragEndInternal(entity, onDragEnd, disabler));
  });

  moveEvents.forEach((event) => {
    entity.asset.on(event, onDragMoveInternal(entity, onDragMove, disabler));
  });
};

export const onDragMoveInternal = (entity, onDragMove, disabler) => () => {
  if (disabler()) {
    return;
  }

  if (entity._dragging) {
    const { x, y } = entity._dragData.getLocalPosition(entity.asset.parent);
    onDragMove(x, y);
  }
};


export const onDragStartInternal = (entity, onDragStart, disabler) => (event) => {
  if (disabler()) {
    return;
  }

  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  entity._dragData = event.data;
  entity._dragging = true;

  const { x, y } = entity._dragData.getLocalPosition(entity.asset.parent);

  onDragStart(x, y);
};

export const onDragEndInternal = (entity, onDragEnd, disabler) => () => {
  if (disabler()) {
    return;
  }

  const { x, y } = entity._dragData.getLocalPosition(entity.asset.parent);

  onDragEnd(x, y);

  entity._dragging = false;
  entity._dragData = null;
};
