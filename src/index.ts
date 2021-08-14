const behaviors: Behavior[] = []
let behaviorsToAdd: Behavior[] = []
let behaviorsToRemove: Behavior[] = []
let _logging = true
const mapIdToBehavior: Record<string, Behavior> = {}

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

// TODO: Split this into 3 subtypes
export type Behavior = {
  id?: string
  labels: readonly string[]
  counter: number
  readonly callback: onceCallback | foreverCallback | everyCallback
  readonly type: BehaviorType
  readonly delay?: number
  readonly interval?: number
  readonly duration?: number
}

// TODO: Test that logging actually works
const log = (text: string) => {
  if (_logging) {
    console.warn(text)
  }
}

export type Options = {
  readonly logging: boolean
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
        // @ts-expect-error
        behavior.callback()
        behaviorsToRemove.push(behavior)
      }
    } else if (behavior.type === BehaviorType.FOREVER) {
      // @ts-expect-error
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

/**
 * Call a function once after a delay.
 */
export const once = (
  callback: onceCallback,
  delay = 1,
  options: BehaviorOptions = {},
): Behavior => {
  const behavior = {
    callback,
    delay,
    type: BehaviorType.ONCE,
    id: options.id,
    labels: options.labels || [],
    counter: 0,
  }
  behaviorsToAdd.push(behavior)

  if (options.id) {
    mapIdToBehavior[options.id] = behavior
  }

  return behavior
}

/**
 * Call a function forever, each interval game update
 */
export const forever = (
  callback: foreverCallback,
  interval = 1,
  options: BehaviorOptions = {},
): Behavior => {
  const behavior = {
    callback,
    interval,
    type: BehaviorType.FOREVER,
    id: options.id,
    labels: options.labels || [],
    counter: 0,
  }
  behaviorsToAdd.push(behavior)

  if (options.id) {
    mapIdToBehavior[options.id] = behavior
  }

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
  const behavior = {
    callback,
    duration,
    type: BehaviorType.EVERY,
    id: options.id,
    labels: options.labels || [],
    counter: 0,
  }
  behaviorsToAdd.push(behavior)

  if (options.id) {
    mapIdToBehavior[options.id] = behavior
  }

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
 * Remove a behavior
 */
export const remove = (behavior: string | Behavior): void => {
  let behaviorObject
  if (typeof behavior === 'string') {
    behaviorObject = get(behavior)
  } else {
    behaviorObject = behavior
  }

  if (behaviorObject) {
    behaviorsToRemove.push(behaviorObject)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    log(`level1: Tried to remove non-existent behavior: ${behavior}`)
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

// TODO: Index this one
/**
 * Get a behavior by label
 *
 * This is currently not indexed and very slow
 */
export const getByLabel = (label: string): Behavior[] =>
  behaviors.filter((behavior: Readonly<Behavior>) =>
    behavior.labels.includes(label),
  )
