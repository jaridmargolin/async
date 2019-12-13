'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Promise, { PromiseResolve, PromiseReject } from './promise'

/* -----------------------------------------------------------------------------
 * LazyPromise
 *
 * Not intended to be used directly - This is utilized by other Promise utils:
 * - Deferred
 * - EventListener
 * - Timer
 * -------------------------------------------------------------------------- */

export default class Deferred<ResolveType = any> extends Promise<ResolveType> {
  protected _resolve: PromiseResolve
  protected _reject: PromiseReject

  constructor () {
    let _resolve: PromiseResolve = () => undefined
    let _reject: PromiseReject = () => undefined

    super((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    this._resolve = _resolve
    this._reject = _reject
  }
}
