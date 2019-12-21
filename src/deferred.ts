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
  private _resolve: PromiseResolve<ResolveType>
  private _reject: PromiseReject

  constructor () {
    let _resolve: PromiseResolve<ResolveType> = () => undefined
    let _reject: PromiseReject = () => undefined

    super((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    this._resolve = _resolve
    this._reject = _reject
  }

  resolve (value?: ResolveType | PromiseLike<ResolveType>) {
    this._resolve(value)
  }

  reject (reason?: any) {
    this._reject(reason)
  }
}
