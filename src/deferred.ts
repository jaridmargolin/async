'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Promise, { PromiseResolve, PromiseReject } from './promise'

/* -----------------------------------------------------------------------------
 * Deferred
 * -------------------------------------------------------------------------- */

export default class Deferred<ResolveType = any> extends Promise<ResolveType> {
  private _resolve: PromiseResolve
  private _reject: PromiseReject

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

  resolve (...args: Parameters<PromiseResolve>) {
    this._resolve(...args)
  }

  reject (...args: Parameters<PromiseReject>) {
    this._reject(...args)
  }
}
