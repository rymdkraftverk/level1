import * as l1 from 'l1'
import _ from 'lodash/fp'
import test from 'ava'

const mockAsyncTicker = (updateFn) =>
  new Promise((resolve) => {
    updateFn()
    resolve()
  })

const deltaTime = 16.666

// * Running the sequence tests concurrently is causing problems
test.serial('sequence - interval 1', (t) => {
  const callback = (notification) => {
    if (updates === 1) {
      t.is(notification, 'Hello')
    } else if (updates === 2) {
      t.is(notification, 'Goodbye')
    } else if (updates === 3) {
      t.is(notification, 'Hello again!')
    }
  }

  const interval = 1
  const notifications = ['Hello', 'Goodbye', 'Hello again!']

  let updates = 0

  l1.forever(() => {
    updates += 1
  })

  const done = l1.sequence(callback, interval, notifications)

  mockAsyncTicker(l1.update)
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))

  return done
})

test.serial('sequence - interval 2', (t) => {
  const callback = (notification) => {
    if (updates === 1) {
      t.is(notification, 'Hello')
    } else if (updates === 3) {
      t.is(notification, 'Goodbye')
    } else if (updates === 5) {
      t.is(notification, 'Hello again!')
    }
  }

  const interval = 2
  const notifications = ['Hello', 'Goodbye', 'Hello again!']

  let updates = 0

  l1.forever(() => {
    updates += 1
  })

  const done = l1.sequence(callback, interval, notifications)

  mockAsyncTicker(l1.update)
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))

  return done
})

test.serial('sequence - interval 3', (t) => {
  const callback = (notification) => {
    if (updates === 1) {
      t.is(notification, 'Hello')
    } else if (updates === 4) {
      t.is(notification, 'Goodbye')
    } else if (updates === 7) {
      t.is(notification, 'Hello again!')
    }
  }

  const interval = 3
  const notifications = ['Hello', 'Goodbye', 'Hello again!']

  let updates = 0

  l1.forever(() => {
    updates += 1
  })

  const done = l1.sequence(callback, interval, notifications)

  mockAsyncTicker(l1.update)
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))
    .then(() => mockAsyncTicker(l1.update))

  return done
})

test('throw error', (t) => {
  // * Throw error after 5 updates
  l1.once(() => {
    throw new Error('Error in l1')
  }, 5)

  _.times(l1.update, 4)
  // @ts-ignore
  t.throws(l1.update)
})

test('forever - default interval', (t) => {
  let counter = 0

  l1.forever(() => {
    counter += 1
  })

  _.times(l1.update, 10)

  t.is(counter, 10)
})

test('forever - interval 2', (t) => {
  let counter = 0

  l1.forever(() => {
    counter += 1
  }, 2)

  _.times(l1.update, 20)

  t.is(counter, 10)
})

test('forever - arguments: counter, deltaTime', (t) => {
  const result = {
    counter: null,
    deltaTime: null,
  }
  l1.forever((counter, deltaTime) => {
    result.counter = counter
    result.deltaTime = deltaTime
  }, 2)

  _.times(() => {
    l1.update(16.66)
  }, 2)

  t.is(result.counter, 2)
  t.is(result.deltaTime, 16.66)
})

test('forever - throw error if no callback', (t) => {
  // @ts-ignore
  t.throws(l1.forever)
})

test('every - runs every tick, automatically removed after duration', (t) => {
  const id = 'every'
  const duration = 2

  let counter = 0
  let done = false

  // eslint-disable-next-line array-callback-return
  const behavior = l1.every(() => {
    counter += 1
    return () => {
      done = true
    }
  }, duration)
  behavior.id = id

  l1.update(deltaTime)
  t.is(counter, 1)
  t.is(done, false)
  t.is(l1.get('every'), behavior)

  l1.update(deltaTime)
  t.is(counter, 2)
  t.is(done, true)
  t.is(l1.get('every'), behavior)

  l1.update(deltaTime)
  t.is(counter, 2)
  t.is(done, true)
  t.is(l1.get('every'), undefined)
})

test('once - default delay', (t) => {
  let done = false

  l1.once(() => {
    done = true
  })

  t.is(done, false)

  l1.update(deltaTime)

  t.is(done, true)
})

test('once - delay 10', (t) => {
  let done = false

  l1.once(() => {
    done = true
  }, 10)

  _.times(l1.update, 9)

  t.is(done, false)

  l1.update(deltaTime)

  t.is(done, true)
})

test.cb('delay', (t) => {
  t.plan(2)
  let done = false

  l1.delay(5).then(() => {
    done = true
    t.is(done, true)
    t.end()
  })

  _.times(l1.update, 5)

  t.is(done, false)

  l1.update(deltaTime)
})

test.cb('delay - multiple', (t) => {
  t.plan(2)
  let done = false

  l1.delay(5).then(() => {
    done = true
    t.is(done, true)
    t.end()
  })

  _.times(l1.update, 5)

  t.is(done, false)

  l1.update(deltaTime)
})

test('once - from once', (t) => {
  let done = false

  l1.once(() => {
    l1.once(() => {
      done = true
    })
  }, 5)

  _.times(l1.update, 5)

  t.is(done, false)

  l1.update(deltaTime)

  t.is(done, true)
})

test('once - throw error if no callback', (t) => {
  // @ts-ignore
  t.throws(l1.once)
})

test('init', (t) => {
  l1.init({ logging: false })

  let done = false

  l1.once(() => {
    done = true
  })

  t.is(done, false)

  l1.update(deltaTime)

  t.is(done, true)
})

test('get', (t) => {
  const id = 'An id'
  const behavior = l1.once(() => {})
  behavior.id = id

  // * update loop needs to run once
  l1.update(deltaTime)

  t.deepEqual(l1.get(id), behavior)
})

test('getByLabel', (t) => {
  const label = 'A label'
  const behavior = l1.once(() => {})
  behavior.labels = [label]

  // * update loop needs to run once
  l1.update(deltaTime)

  t.deepEqual(l1.getByLabel(label)[0], behavior)
})

test('remove - id', (t) => {
  const id = 'An id'
  const behavior = l1.once(() => {})
  behavior.id = id

  l1.update(deltaTime)

  t.deepEqual(l1.get(id), behavior)

  l1.remove(id)

  // * update loop needs to run once
  l1.update(deltaTime)

  t.is(l1.get(id), undefined)
})

test('remove - behavior object', (t) => {
  const id = 'An id'
  const behavior = l1.once(() => {})
  behavior.id = id

  l1.update(deltaTime)

  t.deepEqual(l1.get(id), behavior)

  l1.remove(behavior)

  // * update loop needs to run once
  l1.update(deltaTime)

  t.is(l1.get(id), undefined)
})
