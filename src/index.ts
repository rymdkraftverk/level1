const behaviors: Behavior[] = []
let behaviorsToAdd: Behavior[] = []
let behaviorsToRemove: Behavior[] = []
let _logging = true

enum BehaviorType {
  ONCE = 'once',
  REPEAT = 'repeat',
}

type onceCallback = () => void
type repeatCallback = (updates: number, deltaTime: number) => void

type Behavior = {
  id: string | null
  labels: readonly string[]
  counter: number
  readonly callback: onceCallback | repeatCallback
  readonly type: BehaviorType
  readonly delay?: number
  readonly interval?: number
}

// TODO: Test that logging actually works
const log = (text: string) => {
  if (_logging) {
    console.warn(text)
  }
}

type Options = {
  readonly logging: boolean
}

export const init = (options: Options): void => {
  if (!options) {
    throw new Error('level1: The first argument to init is an options object')
  }

  const { logging = true } = options

  _logging = logging
}

export const update = (deltaTime: number): void => {
  behaviorsToAdd.forEach((behaviorToAdd: Readonly<Behavior>) => {
    behaviors.push(behaviorToAdd)
  })

  behaviorsToAdd = []

  behaviorsToRemove.forEach((behaviorToRemove: Readonly<Behavior>) => {
    // * Mutate original array for performance reasons
    const indexToRemove = behaviors.indexOf(behaviorToRemove)
    if (indexToRemove >= 0) {
      behaviors.splice(indexToRemove, 1)
    }
  })

  behaviorsToRemove = []

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  behaviors.forEach((behavior) => {
    behavior.counter += 1
    if (behavior.type === BehaviorType.ONCE) {
      if (behavior.counter === behavior.delay) {
        // @ts-ignore
        behavior.callback()
        behaviorsToRemove.push(behavior)
      }
    } else if (behavior.type === BehaviorType.REPEAT) {
      // @ts-ignore
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

export const once = (callback: onceCallback, delay = 1): Behavior => {
  if (!callback) {
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

export const repeat = (callback: repeatCallback, interval = 1): Behavior => {
  if (!callback) {
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

export const delay = (delay = 1): Promise<void> =>
  new Promise((resolve) => {
    once(() => {
      resolve()
    }, delay)
  })

type sequence<T> = (
  callback: (item: T) => void,
  interval: number,
  list: readonly T[],
) => Promise<void>

export const sequence = <T>(
  callback: (item: T) => void,
  interval: number,
  list: readonly T[],
): Promise<void> => {
  return list.reduce(
    (p: Readonly<Promise<void>>, item: T) =>
      p.then(() => {
        callback(item)
        return delay(interval)
      }),
    Promise.resolve(),
  )
}

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

export const get = (id: string) =>
  behaviors.find((behavior: Readonly<Behavior>) => behavior.id === id)

export const getAll = (): Behavior[] => behaviors

export const getByLabel = (label: string) =>
  behaviors.filter((behavior: Readonly<Behavior>) =>
    behavior.labels.includes(label),
  )
