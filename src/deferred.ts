'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import { PromiseResolve, PromiseReject } from './promise'
import LazyPromise from './lazy-promise'

/* -----------------------------------------------------------------------------
 * Deferred
 * -------------------------------------------------------------------------- */

export default class Deferred<ResolveType = any> extends LazyPromise<
  ResolveType
  > {
  resolve (...args: Parameters<PromiseResolve>) {
    this._resolve(...args)
  }

  reject (...args: Parameters<PromiseReject>) {
    this._reject(...args)
  }
}
