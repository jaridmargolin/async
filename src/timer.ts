'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import Promise, { PromiseReject, PromiseResolve } from './promise'

/* -----------------------------------------------------------------------------
 * Timer
 * -------------------------------------------------------------------------- */

export enum TimerStatus {
  READY,
  STARTED,
  PAUSED,
  STOPPED,
  COMPLETED
}

export interface TimerWaiting {
  status: TimerStatus.READY
  duration: number
}

export interface TimerRunning {
  status: TimerStatus.STARTED
  timeout: ReturnType<typeof setTimeout>
  start: number
  duration: number
}

export interface TimerPaused {
  status: TimerStatus.PAUSED
  duration: number
}

export interface TimerCompleted {
  status: TimerStatus.COMPLETED | TimerStatus.STOPPED
  duration: null
}

export default class Timer extends Promise<undefined> {
  static create (duration: number) {
    return new Timer(duration)
  }

  private _state: TimerWaiting | TimerRunning | TimerPaused | TimerCompleted
  private _resolve: PromiseResolve
  private _reject: PromiseReject

  constructor (duration: number) {
    let _resolve: PromiseResolve = () => undefined
    let _reject: PromiseReject = () => undefined

    super((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    this._resolve = _resolve
    this._reject = _reject

    this._state = {
      status: TimerStatus.READY,
      duration: duration
    }
  }

  set (duration: number) {
    // reset an active running timer
    if (this._state.status === TimerStatus.STARTED) {
      this.pause()
      Object.assign(this._state, { duration })
      this.start()
    }

    if (
      this._state.status === TimerStatus.READY ||
      this._state.status === TimerStatus.PAUSED
    ) {
      Object.assign(this._state, { duration })
    }

    return this
  }

  start () {
    if (
      this._state.status === TimerStatus.READY ||
      this._state.status === TimerStatus.PAUSED
    ) {
      this._state = {
        status: TimerStatus.STARTED,
        start: Date.now(),
        duration: this._state.duration,
        timeout: setTimeout(() => {
          this._state = {
            status: TimerStatus.COMPLETED,
            duration: null
          }

          this._resolve()
        }, this._state.duration)
      }
    }

    return this
  }

  pause () {
    if (this._state.status === TimerStatus.STARTED) {
      const timeElapsed = Date.now() - this._state.start
      clearTimeout(this._state.timeout)

      this._state = {
        status: TimerStatus.PAUSED,
        duration: this._state.duration - timeElapsed
      }
    }

    return this
  }

  stop (error?: Error) {
    if (this._state.status === TimerStatus.STARTED) {
      clearTimeout(this._state.timeout)
    }

    this._state = {
      status: TimerStatus.STOPPED,
      duration: null
    }

    if (error) {
      this._reject(error)
    }

    return this
  }
}
