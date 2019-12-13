'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Promise, { PromiseReject, PromiseResolve } from './promise'

/* -----------------------------------------------------------------------------
 * Timer
 * -------------------------------------------------------------------------- */

export type EventEmitter = {
  on: (
    event: string | symbol,
    listener: (...args: any[]) => void
  ) => EventEmitter
  off: (
    event: string | symbol,
    listener: (...args: any[]) => void
  ) => EventEmitter
}

export enum EventListenerStatus {
  PENDING,
  RESOLVED = 1,
  REJECTED
}

export default class EventListener<Target extends EventEmitter> extends Promise<
  any
  > {
  static create<Target extends EventEmitter> (
    target: Target,
    event: string | symbol
  ) {
    return new EventListener(target, event)
  }

  private _status: EventListenerStatus
  private _resolve: PromiseResolve
  private _reject: PromiseReject
  private _target: Target
  private _event: string | symbol
  private _onEvent: (evt: any) => any

  constructor (target: Target, event: string | symbol) {
    let _resolve: PromiseResolve = () => undefined
    let _reject: PromiseReject = () => undefined

    super((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    this._resolve = _resolve
    this._reject = _reject
    this._target = target
    this._event = event

    this._onEvent = (evt: any) => {
      this._status = EventListenerStatus.RESOLVED
      this._target.off(this._event, this._onEvent)
      this._resolve(evt)
    }

    this._status = EventListenerStatus.PENDING
    this._target.on(this._event, this._onEvent)
  }

  cancel (error?: Error) {
    this._status = EventListenerStatus.REJECTED
    this._target.off(this._event, this._onEvent)
    this._reject(error)
  }
}
