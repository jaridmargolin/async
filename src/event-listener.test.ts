'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// core
import { EventEmitter } from 'events'

// lib
import EventListener from './event-listener'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

const eventEmitter = new EventEmitter()

describe('event-listener', function () {
  test('Should resolve once event is emitted.', async () => {
    const listener = new EventListener(eventEmitter, 'test')

    eventEmitter.emit('test', 'works')
    expect(await listener).toBe('works')
  })

  test('Should reject if event cancelled.', async () => {
    const listener = new EventListener(eventEmitter, 'test')

    listener.cancel(new Error('Error'))
    expect(listener).rejects.toThrow('Error')
  })

  test('Should create without `new` keyword.', async () => {
    const listener = EventListener.create(eventEmitter, 'test')

    eventEmitter.emit('test', 'works')
    expect(await listener).toBe('works')
  })
})
