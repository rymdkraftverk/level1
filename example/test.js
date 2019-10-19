import * as l1 from 'l1'
import _ from 'lodash/fp'
import test from 'ava'

test('throw error', (t) => {
  // Throw error after 5 updates
  l1.once(() => {
    throw new Error('Error in l1')
  }, 5)

  _.times(l1.update, 4)
  t.throws(l1.update)
})

test('repeat - default interval', (t) => {
  let counter = 0

  l1.repeat(() => {
    counter += 1
  })

  _.times(l1.update, 10)

  t.is(counter, 10)
})

test('repeat - interval 2', (t) => {
  let counter = 0

  l1.repeat(() => {
    counter += 1
  }, 2)

  _.times(l1.update, 20)

  t.is(counter, 10)
})

test('repeat - arguments: counter, deltaTime', (t) => {
  const result = {
    counter: null,
    deltaTime: null,
  }
  l1.repeat((counter, deltaTime) => {
    result.counter = counter
    result.deltaTime = deltaTime
  }, 2)

  _.times(() => { l1.update(16.66) }, 2)

  t.is(result.counter, 2)
  t.is(result.deltaTime, 16.66)
})

test('repeat - throw error if no callback', (t) => {
  t.throws(l1.repeat)
})

test('once - default delay', (t) => {
  let done = false

  l1.once(() => {
    done = true
  })

  t.is(done, false)

  l1.update()

  t.is(done, true)
})

test('once - delay 10', (t) => {
  let done = false

  l1.once(() => {
    done = true
  }, 10)

  _.times(l1.update, 9)

  t.is(done, false)

  l1.update()

  t.is(done, true)
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

  l1.update()

  t.is(done, true)
})

test('once - throw error if no callback', (t) => {
  t.throws(l1.once)
})

test('init - returns update function', (t) => {
  const updateFn = l1.init({ logging: true })

  let done = false

  l1.once(() => {
    done = true
  })

  t.is(done, false)

  updateFn()

  t.is(done, true)
})

test('get', (t) => {
  const id = 'An id'
  const behavior = l1.once(() => {})
  behavior.id = id

  // update loop needs to run once
  l1.update()

  t.deepEqual(l1.get(id), behavior)
})

test('getByLabel', (t) => {
  const label = 'A label'
  const behavior = l1.once(() => {})
  behavior.labels = [label]

  // update loop needs to run once
  l1.update()

  t.deepEqual(l1.getByLabel(label)[0], behavior)
})

test('remove', (t) => {
  const id = 'An id'
  const behavior = l1.once(() => {})
  behavior.id = id

  l1.update()

  t.deepEqual(l1.get(id), behavior)

  l1.remove(id)

  // update loop needs to run once
  l1.update()

  t.is(l1.get(id), undefined)
})
