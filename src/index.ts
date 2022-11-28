enum BehaviorType {
  DELAY = 'delay',
  EVERY = 'every',
  FOREVER = 'forever',
}

export type ForeverCallback = (updates: number, deltaTime: number) => void
export type EveryCallback = (
  updates: number,
  deltaTime: number,
) => void | (() => void)

type SharedBehaviorProperties = {
  id?: string
  labels: string[]
  counter: number
}

export type Delay = SharedBehaviorProperties & {
  type: BehaviorType.DELAY
  delay: number
  promise: Promise<void>
}

export type Forever = SharedBehaviorProperties & {
  callback: ForeverCallback
  type: BehaviorType.FOREVER
  interval: number
}

export type Every = SharedBehaviorProperties & {
  callback: EveryCallback
  type: BehaviorType.EVERY
  duration: number
  promise: Promise<void>
}

export type BehaviorOptions = {
  id?: string
  labels?: string[]
}

export type Behavior = Delay | Forever | Every

export type Instance = {
  update: (deltaTime: number) => void
  delay: (delay: number, options?: BehaviorOptions) => Promise<void>
  forever: (
    callback: ForeverCallback,
    interval: number,
    options?: BehaviorOptions,
  ) => void
  every: (
    callback: EveryCallback,
    duration: number,
    options?: BehaviorOptions,
  ) => Promise<void>
  cancel: (behaviorId: string) => void
  get: (id: string) => Behavior | undefined
  getAll: () => Behavior[]
  getByLabel: (label: string) => Behavior[]
}

export default function createInstance(): Instance {
  const behaviors: Behavior[] = []
  let behaviorsToAdd: Behavior[] = []
  let behaviorsToRemove: Behavior[] = []
  const mapIdToBehavior: Record<string, Behavior> = {}
  const mapLabelToBehaviors: Record<string, Behavior[]> = {}

  /**
   * Wait for a number of updates
   */
  const delay = async (
    delay: number,
    options: BehaviorOptions = {},
  ): Promise<void> => {
    const promise = new Promise<void>((resolve) => {
      resolve()
    })

    const behavior: Delay = {
      delay,
      type: BehaviorType.DELAY,
      id: options.id,
      labels: options.labels ?? [],
      counter: 0,
      promise,
    }
    handleOptions(behavior)
    behaviorsToAdd.push(behavior)

    return promise
  }

  /**
   * Call a function forever, each interval game update
   */
  const forever = (
    callback: ForeverCallback,
    interval: number,
    options: BehaviorOptions = {},
  ): void => {
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
  }

  /**
   * Call a function `every` update until duration is reached
   */
  const every = async (
    callback: EveryCallback,
    duration: number,
    options: BehaviorOptions = {},
  ): Promise<void> => {
    const promise = new Promise<void>((resolve) => {
      resolve()
    })
    const behavior: Every = {
      callback,
      duration,
      type: BehaviorType.EVERY,
      id: options.id,
      labels: options.labels ?? [],
      counter: 0,
      promise,
    }
    handleOptions(behavior)
    behaviorsToAdd.push(behavior)

    return promise
  }

  /**
   * Cancel a behavior
   */
  const cancel = (behaviorId: string): void => {
    const behaviorObject = get(behaviorId)

    if (behaviorObject) {
      behaviorsToRemove.push(behaviorObject)
    } else {
      console.warn(
        `level1: Tried to cancel non-existent behavior: ${behaviorId}`,
      )
    }
  }

  /**
   * Get a behavior by id
   */
  const get = (id: string): Behavior | undefined => mapIdToBehavior[id]

  /**
   * Get all behaviors
   */
  const getAll = (): Behavior[] => behaviors

  /**
   * Get a behavior by label
   */
  const getByLabel = (label: string): Behavior[] =>
    mapLabelToBehaviors[label] ?? []

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
   * Needs to be called on every game update.
   */
  const update = (deltaTime: number): void => {
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
      switch (behavior.type) {
        case BehaviorType.DELAY: {
          if (behavior.counter === behavior.delay) {
            void Promise.resolve(behavior.promise)
            behaviorsToRemove.push(behavior)
          }
          break
        }

        case BehaviorType.FOREVER: {
          if (behavior.counter % behavior.interval === 0) {
            behavior.callback(behavior.counter, deltaTime)
          }

          break
        }

        case BehaviorType.EVERY: {
          const onDone = behavior.callback(behavior.counter, deltaTime)
          if (behavior.counter === behavior.duration) {
            if (onDone) {
              onDone()
            }

            void Promise.resolve(behavior.promise)
            behaviorsToRemove.push(behavior)
          }

          break
        }
        // No default
      }
    }
  }

  return {
    update,
    delay,
    forever,
    every,
    cancel,
    get,
    getAll,
    getByLabel,
  }
}
