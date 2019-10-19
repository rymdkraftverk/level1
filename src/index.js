const behaviors = []
let behaviorsToAdd = []
let behaviorsToRemove = []
// eslint-disable-next-line no-underscore-dangle
let _logging = true

const BehaviorType = {
  ONCE: 'once',
  REPEAT: 'repeat',
}

const log = (text) => {
  if (_logging) {
    // eslint-disable-next-line no-console
    console.warn(text)
  }
}

export const init = ({ logging = false }) => {
  _logging = logging
  return update
}

export const update = (deltaTime) => {
  behaviorsToAdd.forEach((behaviorToAdd) => {
    behaviors.push(behaviorToAdd)
  })

  behaviorsToAdd = []

  behaviorsToRemove.forEach((behaviorToRemove) => {
    // Mutate original array for performance reasons
    const indexToRemove = behaviors.indexOf(behaviorToRemove)
    if (indexToRemove >= 0) {
      behaviors.splice(indexToRemove, 1)
    }
  })

  behaviorsToRemove = []

  behaviors.forEach((behavior) => {
    // eslint-disable-next-line no-param-reassign
    behavior.counter += 1
    if (behavior.type === BehaviorType.ONCE) {
      if (behavior.counter === behavior.delay) {
        behavior.callback()
        behaviorsToRemove.push(behavior)
      }
    } else if (behavior.type === BehaviorType.REPEAT) {
      if (behavior.counter % behavior.interval === 0) {
        behavior.callback(behavior.counter, deltaTime)
      }
    }
  })
}

const commonBehaviorProperties = {
  id: null,
  labels: [],
  counter: 0,
}

// TODO: once and repeat could share more code
export const once = (callback, delay = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.once needs to be a function')
  }
  const behavior = {
    callback,
    delay,
    type: BehaviorType.ONCE,
    ...commonBehaviorProperties,
  }
  behaviorsToAdd.push(behavior)
  return behavior
}

export const repeat = (callback, interval = 1) => {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The fist argument to l1.repeat needs to be a function')
  }
  const behavior = {
    callback,
    interval,
    type: BehaviorType.REPEAT,
    ...commonBehaviorProperties,
  }
  behaviorsToAdd.push(behavior)
  return behavior
}

export const remove = (behavior) => {
  let behaviorObject
  if (typeof behavior === 'string') {
    behaviorObject = get(behavior)
  } else {
    behaviorObject = behavior
  }
  if (!behaviorObject) {
    log(`level1: Tried to remove non-existent behavior: ${behavior}`)
  } else {
    behaviorsToRemove.push(behaviorObject)
  }
}

export const get = (id) => behaviors.find((behavior) => behavior.id === id)

export const getAll = () => behaviors

export const getByLabel = (label) => behaviors
  .filter((behavior) => behavior.labels.includes(label))

// TODO: Document this
export const reset = (behavior) => {
  if (typeof behavior === 'string') {
    // eslint-disable-next-line no-param-reassign
    behavior = get(behavior)
  }
  if (!behavior) {
    log(`level1: Tried to reset non-existent behavior: ${behavior}`)
  } else {
    // eslint-disable-next-line no-param-reassign
    behavior.counter = 0
  }
}

// TODO: Document this
export const exists = (id) => behaviors.some((behavior) => behavior.id === id)
