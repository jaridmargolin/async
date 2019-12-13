'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import LazyPromise from './lazy-promise'

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

export default class EventListener<
Target extends EventEmitter
> extends LazyPromise<any> {
  static create<Target extends EventEmitter> (
    target: Target,
    event: string | symbol
  ) {
    return new EventListener(target, event)
  }

  private _status: EventListenerStatus
  private _target: Target
  private _event: string | symbol

  constructor (target: Target, event: string | symbol) {
    super()

    this._status = EventListenerStatus.PENDING
    this._target = target
    this._event = event

    this._target.on(this._event, this._onEvent)
  }

  private _onEvent = (evt: any) => {
    this._status = EventListenerStatus.RESOLVED
    this._target.off(this._event, this._onEvent)
    this._resolve(evt)
  }

  cancel (error?: Error) {
    this._status = EventListenerStatus.REJECTED
    this._target.off(this._event, this._onEvent)
    this._reject(error)
  }
}
