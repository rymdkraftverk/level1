const behaviors: Behavior[] = []
let behaviorsToAdd: Behavior[] = []
let behaviorsToRemove: Behavior[] = []
let _logging = true
const mapIdToBehavior: Record<string, Behavior> = {}
const mapLabelToBehaviors: Record<string, Behavior[]> = {}

enum BehaviorType {
  ONCE = 'once',
  EVERY = 'every',
  FOREVER = 'forever',
}

export type onceCallback = () => void
export type foreverCallback = (updates: number, deltaTime: number) => void
export type everyCallback = (
  updates: number,
  deltaTime: number,
) => void | (() => void)

type SharedBehaviorProperties = {
  id?: string
  labels: string[]
  counter: number
}

export type Once = SharedBehaviorProperties & {
  callback: onceCallback
  type: BehaviorType.ONCE
  delay: number
}

export type Forever = SharedBehaviorProperties & {
  callback: foreverCallback
  type: BehaviorType.FOREVER
  interval: number
}

export type Every = SharedBehaviorProperties & {
  callback: everyCallback
  type: BehaviorType.EVERY
  duration: number
}

export type Behavior = Once | Forever | Every

// TODO: Test that logging actually works
const log = (text: string) => {
  if (_logging) {
    console.warn(text)
  }
}

export type Options = {
  logging: boolean
}

/**
 * Configure level1
 */
export const init = (options: Options): void => {
  const { logging = true } = options

  _logging = logging
}

/**
 * Needs to be called on every game update.
 */
export const update = (deltaTime: number): void => {
  behaviors.push(...behaviorsToAdd)
  behaviorsToAdd = []

  for (const behaviorToRemove of behaviorsToRemove) {
    if (behaviorToRemove.id) {
      delete mapIdToBehavior[behaviorToRemove.id]
    }
    if (behaviorToRemove.labels.length > 0) {
      for (const label of behaviorToRemove.labels) {
        mapLabelToBehaviors[label] = mapLabelToBehaviors[label].filter(
          (b) => b.id !== behaviorToRemove.id,
        )
      }
    }

    const indexToRemove = behaviors.indexOf(behaviorToRemove)
    if (indexToRemove >= 0) {
      behaviors.splice(indexToRemove, 1)
    }
  }

  behaviorsToRemove = []

  for (const behavior of behaviors) {
    behavior.counter += 1
    if (behavior.type === BehaviorType.ONCE) {
      if (behavior.counter === behavior.delay) {
        behavior.callback()
        behaviorsToRemove.push(behavior)
      }
    } else if (behavior.type === BehaviorType.FOREVER) {
      if (behavior.counter % behavior.interval === 0) {
        behavior.callback(behavior.counter, deltaTime)
      }
    } else if (behavior.type === BehaviorType.EVERY) {
      const onDone = behavior.callback(behavior.counter, deltaTime)
      if (behavior.counter === behavior.duration) {
        if (onDone) {
          onDone()
        }

        behaviorsToRemove.push(behavior)
      }
    }
  }
}

const handleOptions = (behavior: Behavior) => {
  if (behavior.id) {
    mapIdToBehavior[behavior.id] = behavior
  }

  if (behavior.labels && behavior.labels.length > 0) {
    for (const label of behavior.labels) {
      if (mapLabelToBehaviors[label]) {
        mapLabelToBehaviors[label] = [...mapLabelToBehaviors[label], behavior]
      } else {
        mapLabelToBehaviors[label] = [behavior]
      }
    }
  }
}

/**
 * Call a function once after a delay.
 */
export const once = (
  callback: onceCallback,
  delay: number,
  options: BehaviorOptions = {},
): Behavior => {
  const behavior: Once = {
    callback,
    delay,
    type: BehaviorType.ONCE,
    id: options.id,
    labels: options.labels ?? [],
    counter: 0,
  }

  handleOptions(behavior)
  behaviorsToAdd.push(behavior)

  return behavior
}

/**
 * Call a function forever, each interval game update
 */
export const forever = (
  callback: foreverCallback,
  interval: number,
  options: BehaviorOptions = {},
): Behavior => {
  const behavior: Forever = {
    callback,
    interval,
    type: BehaviorType.FOREVER,
    id: options.id,
    labels: options.labels ?? [],
    counter: 0,
  }

  handleOptions(behavior)
  behaviorsToAdd.push(behavior)

  return behavior
}

type BehaviorOptions = {
  id?: string
  labels?: string[]
}

/**
 * Call a function `every` update until duration is reached
 */
export const every = (
  callback: everyCallback,
  duration: number,
  options: BehaviorOptions = {},
): Behavior => {
  const behavior: Every = {
    callback,
    duration,
    type: BehaviorType.EVERY,
    id: options.id,
    labels: options.labels ?? [],
    counter: 0,
  }

  handleOptions(behavior)
  behaviorsToAdd.push(behavior)

  return behavior
}

/**
 * Resolves a promise after a delay
 */
export const delay = (delay = 1): Promise<void> =>
  new Promise((resolve) => {
    once(() => {
      resolve()
    }, delay)
  })

/**
 * Cancel a behavior
 */
export const cancel = (behavior: string | Behavior): void => {
  const behaviorObject = typeof behavior === 'string' ? get(behavior) : behavior

  if (behaviorObject) {
    behaviorsToRemove.push(behaviorObject)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    log(`level1: Tried to cancel non-existent behavior: ${behavior}`)
  }
}

/**
 * Get a behavior by id
 */
export const get = (id: string): Behavior | undefined => mapIdToBehavior[id]

/**
 * Get all behaviors
 */
export const getAll = (): Behavior[] => behaviors

/**
 * Get a behavior by label
 */
export const getByLabel = (label: string): Behavior[] =>
  mapLabelToBehaviors[label] ?? []

export default {
  once,
  forever,
  every,
  init,
  update,
  delay,
  cancel,
  get,
  getAll,
  getByLabel,
}
