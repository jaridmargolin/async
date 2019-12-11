'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Timer from './timer'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('timer', function () {
  test('Should defer starting timer.', async () => {
    const timer = new Timer(1)
    let resolved = false

    timer.then(() => (resolved = true))
    await new Promise(resolve => setTimeout(resolve, 1))

    expect(resolved).toBe(false)
  })

  test('Should resolve after duration.', async () => {
    const startTime = Date.now()
    const timer = new Timer(50)

    await timer.start()

    expect(Date.now()).toBeGreaterThanOrEqual(startTime + 50)
  })

  test('Should cancel running timer.', async () => {
    const timer = new Timer(1)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.start()
    timer.stop()

    await new Promise(resolve => setTimeout(resolve, 1))

    expect(resolved).toBe(false)
  })

  test('Should not run cancelled timer.', async () => {
    const timer = new Timer(1)
    let resolved = false

    timer.stop()
    timer.then(() => (resolved = true))
    timer.start()

    await new Promise(resolve => setTimeout(resolve, 1))

    expect(resolved).toBe(false)
  })

  test('Should reject on cancel.', async () => {
    const timer = new Timer(1)
    let caught = false
    let cancelError = new Error('Cancel')

    timer.stop(cancelError)
    await timer.catch(error => {
      caught = true
      expect(error).toBe(cancelError)
    })

    expect(caught).toBe(true)
  })

  test('Should pause timer.', async () => {
    const timer = new Timer(1)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.start()
    timer.pause()

    await new Promise(resolve => setTimeout(resolve, 1))

    expect(resolved).toBe(false)
  })

  test('Should resume pause timer.', async () => {
    const timer = new Timer(1)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.start()

    await new Promise(resolve => setTimeout(resolve, 25))
    timer.pause()
    timer.start()
    await new Promise(resolve => setTimeout(resolve, 25))

    expect(resolved).toBe(true)
  })

  test('Can set duration of timer instance.', async () => {
    const timer = new Timer(50)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.set(1)
    timer.start()

    await new Promise(resolve => setTimeout(resolve, 1))
    expect(resolved).toBe(true)
  })

  test('Can set duration of running timer instance.', async () => {
    const timer = new Timer(50)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.start()
    timer.set(1)

    await new Promise(resolve => setTimeout(resolve, 1))
    expect(resolved).toBe(true)
  })

  test('Can set duration of paused timer instance.', async () => {
    const timer = new Timer(50)
    let resolved = false

    timer.then(() => (resolved = true))
    timer.start()

    await new Promise(resolve => setTimeout(resolve, 25))
    expect(resolved).toBe(false)

    timer.pause()
    timer.set(1)
    timer.start()

    await new Promise(resolve => setTimeout(resolve, 1))
    expect(resolved).toBe(true)
  })

  test('Should create with `new` keyword.', async () => {
    const startTime = Date.now()
    const timer = Timer.create(50)

    await timer.start()

    expect(Date.now()).toBeGreaterThanOrEqual(startTime + 50)
  })
})
