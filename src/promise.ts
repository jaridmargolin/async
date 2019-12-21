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

export type PromiseOnFulfilled<InputType, OutputType> =
  | ((value: InputType) => OutputType | PromiseLike<OutputType>)
  | undefined
  | null

export type PromiseOnRejected<OutputType> =
  | ((reason: any) => OutputType | PromiseLike<OutputType>)
  | undefined
  | null

export type PromiseOnFinally = (() => void) | undefined | null

export default class BasePromise<ResolveType = any> {
  private _promise: Promise<ResolveType>

  constructor (executor: PromiseExecutor<ResolveType>) {
    this._promise = new Promise<ResolveType>(executor)
  }

  then<TResult1 = ResolveType, TResult2 = never> (
    onfulfilled?: PromiseOnFulfilled<ResolveType, TResult1>,
    onrejected?: PromiseOnRejected<TResult2>
  ) {
    return this._promise.then(onfulfilled, onrejected)
  }

  catch<TResult> (onrejected?: PromiseOnRejected<TResult>) {
    return this._promise.catch(onrejected)
  }

  finally (onfinally?: PromiseOnFinally) {
    return this._promise.finally(onfinally)
  }
}
