import test from 'ava'
import schedule from './index'
import sinon from 'sinon'
global.requestAnimationFrame = require('raf')

test.before(t => {
  t.context.clock = sinon.useFakeTimers()
})

test.after(t => {
  t.context.clock.restore()
})

test('should call all measure calls before all update calls', t => {
  let calls = []

  schedule({
    measure: () => calls.push(1),
    update: val => calls.push(2)
  })

  schedule({
    measure: () => calls.push(3),
    update: val => calls.push(4)
  })

  t.context.clock.runAll()

  t.deepEqual(calls, [1, 3, 2, 4])
})

test('should handle missing functions', t => {
  let calls = []

  schedule({
    update: () => calls.push(2)
  })

  schedule({
    measure: () => calls.push(1)
  })

  t.context.clock.runAll()
  t.deepEqual(calls, [1, 2])
})

test('should work in loops', t => {
  let calls = []

  for (let index = 0; index < 5; index++) {
    schedule({
      measure: () => calls.push(index),
      update: () => calls.push(index)
    })
  }

  t.context.clock.runAll()
  t.deepEqual(calls, [0, 1, 2, 3, 4, 0, 1, 2, 3, 4])
})

test('update should be called with the return value of measure', t => {
  let value = 'measure'
  schedule({
    measure: () => value,
    update: val => {
      value = val + '-update'
    }
  })

  t.context.clock.runAll()
  t.is(value, 'measure-update')
})

test('errors should get catched', t => {
  let calls = []

  schedule({
    measure: () => calls.push(1),
    update: val => {
      throw Error('boom')
    }
  })

  schedule({
    measure: () => calls.push(2),
    update: () => calls.push(3)
  })

  schedule({
    measure: () => {
      throw Error('boom')
    },
    update: err => calls.push(err.message)
  })

  schedule({
    measure: () => calls.push(4),
    update: () => calls.push(5)
  })

  t.context.clock.runAll()
  t.is(calls[4], 'boom', 'The error was not caught in measure')
  t.deepEqual(calls, [1, 2, 4, 3, 'boom', 5])
})
