import '@babel/polyfill';

const Matter = require('matter-js');
const PIXI = require('pixi.js');

const Gamepad = require('./input/Gamepad');
const Key = require('./input/Key');
const Net = require('./net/Net');

const container = require('./entityCreator/container').default;
const sprite = require('./entityCreator/sprite').default;
const animation = require('./entityCreator/animation').default;
const graphics = require('./entityCreator/graphics').default;
const text = require('./entityCreator/text').default;
const bitmapText = require('./entityCreator/bitmapText').default;
const particles = require('./entityCreator/particles').default;
const sound = require('./entityCreator/sound').default;

const addBehavior = require('./entityModifier/addBehavior').default;
const addBody = require('./entityModifier/addBody').default;
// const addCollision = require('./entityModifier/addCollision').default;
const addFilter = require('./entityModifier/addFilter').default;
const addType = require('./entityModifier/addType').default;
const clearFilters = require('./entityModifier/clearFilters').default;
const Filter = require('./entityModifier/Filter').default;
const getBehavior = require('./entityModifier/getBehavior').default;
// const removeAllCollisions = require('./entityModifier/removeAllCollisions').default;
const removeBehavior = require('./entityModifier/removeBehavior').default;
const removeBody = require('./entityModifier/removeBody').default;
// const removeCollision = require('./entityModifier/removeCollision').default;
const removeFilter = require('./entityModifier/removeFilter').default;
const removeType = require('./entityModifier/removeType').default;
const resetBehavior = require('./entityModifier/resetBehavior').default;
const scaleText = require('./entityModifier/scaleText').default;

const destroy = require('./entityUtil/destroy').default;
const get = require('./entityUtil/get').default;
const getAllEntities = require('./entityUtil/getAllEntities').default;
const getById = require('./entityUtil/getById').default;
const getByType = require('./entityUtil/getByType').default;
const getOverlappingArea = require('./entityUtil/getOverlappingArea').default;
const isColliding = require('./entityUtil/isColliding').default;

const getRenderer = require('./game/getRenderer').default;
const getScreenScale = require('./game/getScreenScale').default;
const getStage = require('./game/getStage').default;
const init = require('./game/init').default;
const resize = require('./game/resize').default;
const start = require('./game/start').default;
const stop = require('./game/stop').default;

const getPhysicsEngine = require('./physics/getPhysicsEngine').default;

const angle = require('./util/angle').default;
const distance = require('./util/distance').default;
const getRandomInRange = require('./util/getRandomInRange').default;
const grid = require('./util/grid').default;
const toRadians = require('./util/toRadians').default;

module.exports = {
  Gamepad,
  Key,
  Net,
  Matter,
  PIXI,
  text,
  animation,
  container,
  sprite,
  graphics,
  addBehavior,
  removeBehavior,
  scaleText,
  getPhysicsEngine,
  getRenderer,
  getStage,
  init,
  getScreenScale,
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
