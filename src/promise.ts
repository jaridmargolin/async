'use strict'

/* -----------------------------------------------------------------------------
 * Promise
 * -------------------------------------------------------------------------- */

export type PromiseResolve<Value = any> = (
  value?: Value | PromiseLike<Value>
) => void

export type PromiseReject = (reason?: any) => void

export type PromiseExecutor<ResolveType = any> = (
  resolve: PromiseResolve<ResolveType>,
  reject: PromiseReject
) => void

export default class BasePromise<ResolveType = any> {
  private _promise: Promise<ResolveType>

  constructor (executor: PromiseExecutor<ResolveType>) {
    this._promise = new Promise<ResolveType>(executor)
  }

  then (...args: Parameters<Promise<ResolveType>['then']>) {
    return this._promise.then(...args)
  }

  catch (...args: Parameters<Promise<ResolveType>['catch']>) {
    return this._promise.catch(...args)
  }

  finally (...args: Parameters<Promise<ResolveType>['finally']>) {
    return this._promise.finally(...args)
  }
}
