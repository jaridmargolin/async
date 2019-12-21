'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Promise from './promise'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('promise', function () {
  test('Should correctly pass through types on chained methods.', async () => {
    const promise = new Promise<{ val: boolean }>(resolve =>
      resolve({ val: true })
    ).then(result => result)

    expect((await promise).val).toBe(true)
  })
})
