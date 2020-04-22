const behaviors = []
let behaviorsToAdd = []
let behaviorsToRemove = []
let _logging = true

const BehaviorType = {
  ONCE: 'once',
  REPEAT: 'repeat',
}

// TODO: Test that logging actually works
const log = (text) => {
  if (_logging) {
    console.warn(text)
  }
}

export const init = (options) => {
  // TODO: Validate that options has the correct shape
  if (!options) {
    throw new Error('level1: The first argument to init is an options object')
  }

  const { logging = true } = options

  _logging = logging
}

export const update = (deltaTime) => {
  behaviorsToAdd.forEach((behaviorToAdd) => {
    behaviors.push(behaviorToAdd)
  })

  behaviorsToAdd = []

  behaviorsToRemove.forEach((behaviorToRemove) => {
    // * Mutate original array for performance reasons
    const indexToRemove = behaviors.indexOf(behaviorToRemove)
    if (indexToRemove >= 0) {
      behaviors.splice(indexToRemove, 1)
    }
  })

  behaviorsToRemove = []

  behaviors.forEach((behavior) => {
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

export const delay = (delay) =>
  new Promise((resolve) => {
    once(() => {
      resolve()
    }, delay)
  })

export const sequence = (callback, interval, list) => {
  return list.reduce(
    (p, item) =>
      p.then(() => {
        callback(item)
        return delay(interval)
      }),
    Promise.resolve(),
  )
}

export const remove = (behavior) => {
  let behaviorObject
  if (typeof behavior === 'string') {
    behaviorObject = get(behavior)
  } else {
    behaviorObject = behavior
  }

  if (behaviorObject) {
    behaviorsToRemove.push(behaviorObject)
  } else {
    log(`level1: Tried to remove non-existent behavior: ${behavior}`)
  }
}

export const get = (id) => behaviors.find((behavior) => behavior.id === id)

export const getAll = () => behaviors

export const getByLabel = (label) =>
  behaviors.filter((behavior) => behavior.labels.includes(label))

// * Undocumented - Might be removed in the future
export const reset = (behavior) => {
  if (typeof behavior === 'string') {
    behavior = get(behavior)
  }

  if (behavior) {
    behavior.counter = 0
  } else {
    log(`level1: Tried to reset non-existent behavior: ${behavior}`)
  }
}
