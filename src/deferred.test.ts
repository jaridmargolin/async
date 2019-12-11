'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Deferred from './deferred'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('deferred', function () {
  test('Should resolve deferred.', async () => {
    const deferred = new Deferred()

    setTimeout(() => deferred.resolve(1), 0)
    expect(await deferred).toEqual(1)
  })

  test('Should reject deferred.', async () => {
    const deferred = new Deferred()

    setTimeout(() => deferred.reject(new Error('Error')), 0)
    await expect(deferred).rejects.toThrow('Error')
  })
})
