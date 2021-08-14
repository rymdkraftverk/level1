#!/usr/bin/env node

const { forever, update, get } = require('l1')
const _ = require('lodash/fp')
const { performance } = require('perf_hooks')

const _update = () => {
  _.times(() => forever(() => {}, 1), 1000)
  const before = performance.now()
  _.times(update, 120)
  const after = performance.now()
  const delta = after - before
  console.log('Update - Time to run', delta)
}

const _get = () => {
  _.times((index) => {
    const behavior = forever(() => {}, 1, { id: `id-${index}` })
    return behavior
  }, 1000)
  const before = performance.now()
  _.times((index) => get(`id-${index}`), 1000)
  const after = performance.now()
  const delta = after - before
  console.log('Get - Time to run', delta)
}

_update()
_get()
