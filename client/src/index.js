import '@babel/polyfill';

const Matter = require('matter-js');
const PIXI = require('pixi.js');

const Gamepad = require('./Gamepad');
const Key = require('./Key');
const Net = require('./Net');

const entity = require('./next/entityCreator/entity').default;
const sprite = require('./next/entityCreator/sprite').default;
const animation = require('./next/entityCreator/animation').default;
const graphics = require('./next/entityCreator/graphics').default;
const text = require('./next/entityCreator/text').default;
const bitmapText = require('./next/entityCreator/bitmapText').default;
const particles = require('./next/entityCreator/particles').default;
const sound = require('./next/entityCreator/sound').default;

const addBehavior = require('./next/entityModifier/addBehavior').default;
const addBody = require('./next/entityModifier/addBody').default;
// const addCollision = require('./next/entityModifier/addCollision').default;
const addFilter = require('./next/entityModifier/addFilter').default;
const addType = require('./next/entityModifier/addType').default;
const clearFilters = require('./next/entityModifier/clearFilters').default;
const Filter = require('./next/entityModifier/Filter').default;
const getBehavior = require('./next/entityModifier/getBehavior').default;
// const removeAllCollisions = require('./next/entityModifier/removeAllCollisions').default;
const removeBehavior = require('./next/entityModifier/removeBehavior').default;
const removeBody = require('./next/entityModifier/removeBody').default;
// const removeCollision = require('./next/entityModifier/removeCollision').default;
const removeFilter = require('./next/entityModifier/removeFilter').default;
const removeType = require('./next/entityModifier/removeType').default;
const resetBehavior = require('./next/entityModifier/resetBehavior').default;
const scaleText = require('./next/entityModifier/scaleText').default;

const destroy = require('./next/entityUtil/destroy').default;
const get = require('./next/entityUtil/get').default;
const getAllEntities = require('./next/entityUtil/getAllEntities').default;
const getById = require('./next/entityUtil/getById').default;
const getByType = require('./next/entityUtil/getByType').default;
const getOverlappingArea = require('./next/entityUtil/getOverlappingArea').default;
const getX = require('./next/entityUtil/getX').default;
const getY = require('./next/entityUtil/getY').default;
const isColliding = require('./next/entityUtil/isColliding').default;

const getRenderer = require('./next/game/getRenderer').default;
const getStage = require('./next/game/getStage').default;
const init = require('./next/game/init').default;
const resize = require('./next/game/resize').default;
const start = require('./next/game/start').default;
const stop = require('./next/game/stop').default;

const getPhysicsEngine = require('./next/physics/getPhysicsEngine').default;

const angle = require('./next/util/angle').default;
const distance = require('./next/util/distance').default;
const getRandomInRange = require('./next/util/getRandomInRange').default;
const grid = require('./next/util/grid').default;
const toRadians = require('./next/util/toRadians').default;

module.exports = {
  Gamepad,
  Key,
  Net,
  Matter,
  PIXI,
  text,
  animation,
  entity,
  sprite,
  graphics,
  getX,
  getY,
  addBehavior,
  removeBehavior,
  scaleText,
  getPhysicsEngine,
  getRenderer,
  getStage,
  init,
  resize,
  start,
  stop,
  addFilter,
  clearFilters,
  Filter,
  getBehavior,
  removeFilter,
  resetBehavior,
  angle,
  distance,
  getRandomInRange,
  grid,
  toRadians,
  bitmapText,
  particles,
  sound,
  addBody,
  // addCollision,
  addType,
  // removeAllCollisions,
  removeBody,
  // removeCollision,
  removeType,
  destroy,
  get,
  getAllEntities,
  getById,
  getByType,
  getOverlappingArea,
  isColliding,
};
