import createInstance from 'l1'
import _ from 'lodash/fp'
import test from 'ava'

const deltaTime = 16.666

test('throw error', (t) => {
  const { every, update } = createInstance()
  const promise = every(() => {
    throw new Error('Error in l1')
  }, 1)

  t.throws(() => {
    update(deltaTime)
  })

  return promise
})

test('forever - default interval', (t) => {
  const { forever, update } = createInstance()
  let counter = 0

  forever(() => {
    counter += 1
  }, 1)

  _.times(update, 10)

  t.is(counter, 10)
})

test('forever - interval 2', (t) => {
  const { forever, update } = createInstance()

  let counter = 0

  forever(() => {
    counter += 1
  }, 2)

  _.times(update, 20)

  t.is(counter, 10)
})

test('forever - arguments: counter, deltaTime', (t) => {
  const { forever, update } = createInstance()

  const result: { counter?: number; deltaTime?: number } = {
    counter: undefined,
    deltaTime: undefined,
  }
  forever((counter, deltaTime) => {
    result.counter = counter
    result.deltaTime = deltaTime
  }, 2)

  _.times(() => {
    update(deltaTime)
  }, 2)

  t.is(result.counter, 2)
  t.is(result.deltaTime, deltaTime)
})

test('every - runs every tick, automatically canceled after duration', (t) => {
  t.plan(11)
  const { every, update, get } = createInstance()

  const id = 'every'
  let counter = 0
  let done = false

  const promise = every(
    () => {
      counter += 1
      return () => {
        done = true
      }
    },
    2,
    { id },
  ).then(() => {
    t.pass('Completed every')
  })

  t.is(counter, 0)
  update(deltaTime)
  t.is(counter, 1)
  t.is(done, false)
  t.is(get('every')?.id, id)

  update(deltaTime)
  t.is(counter, 2)
  t.is(done, true)
  t.is(get('every')?.id, id)

  update(deltaTime)
  t.is(counter, 2)
  t.is(done, true)
  t.is(get('every'), undefined)

  return promise
})

test('every - without return', (t) => {
  const { every, update, get } = createInstance()

  const id = 'every'
  const duration = 2

  let counter = 0

  const promise = every(
    () => {
      counter += 1
    },
    duration,
    { id },
  )

  update(deltaTime)
  t.is(counter, 1)
  t.is(get('every')?.id, id)

  update(deltaTime)
  t.is(counter, 2)
  t.is(get('every')?.id, id)

  update(deltaTime)
  t.is(counter, 2)
  t.is(get('every'), undefined)

  return promise
})

test('delay', (t) => {
  const { delay, update, get } = createInstance()

  t.plan(3)
  const id = 'delay'

  const promise = delay(2, { id }).then(() => {
    t.pass('Delay completed')
  })

  t.is(get(id)?.id, id)

  update(deltaTime)
  update(deltaTime)
  update(deltaTime)

  t.is(get(id), undefined)

  return promise
})

test('delay - delay 10', (t) => {
  const { delay, update } = createInstance()
  t.plan(1)

  const promise = delay(10).then(() => {
    t.pass('Delay completed')
  })

  _.times(update, 10)
  update(deltaTime)

  return promise
})

test('get', (t) => {
  const { delay, get, update } = createInstance()
  const id = 'An id'
  delay(10, { id })

  update(deltaTime)

  t.deepEqual(get(id)?.id, id)
})

test('getByLabel', (t) => {
  const { delay, getByLabel, update } = createInstance()

  const label = 'A label'
  delay(10, {
    labels: [label],
  })

  update(deltaTime)
  t.deepEqual(getByLabel(label)[0].labels[0], label)
})

test('getByLabel - label does not exist', (t) => {
  const { delay, getByLabel, update } = createInstance()

  const label = 'A label'

  delay(10, {
    labels: [label],
  })

  update(deltaTime)
  t.deepEqual(getByLabel('does not exist'), [])
})

test('cancel - id', (t) => {
  const { delay, getByLabel, update, get, cancel } = createInstance()

  const id = 'An id'
  const label = 'A label'

  delay(10, { id, labels: [label] })

  update(deltaTime)

  t.is(get(id)?.id, id)
  t.is(getByLabel(label)[0].id, id)

  update(deltaTime)
  cancel(id)

  update(deltaTime)

  t.is(get(id), undefined)
  t.deepEqual(getByLabel(label), [])
})

test('cancel - object', (t) => {
  const { delay, update, get, cancel } = createInstance()

  const id = 'An id'

  delay(10, { id })

  update(deltaTime)

  t.is(get(id)?.id, id)

  update(deltaTime)
  cancel(get(id)!)

  update(deltaTime)

  t.is(get(id), undefined)
})
