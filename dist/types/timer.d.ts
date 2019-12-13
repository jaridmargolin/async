import LazyPromise from './lazy-promise';
export declare enum TimerStatus {
    READY = 0,
    STARTED = 1,
    PAUSED = 2,
    STOPPED = 3,
    COMPLETED = 4
}
export interface TimerWaiting {
    status: TimerStatus.READY;
    duration: number;
}
export interface TimerRunning {
    status: TimerStatus.STARTED;
    timeout: ReturnType<typeof setTimeout>;
    start: number;
    duration: number;
}
export interface TimerPaused {
    status: TimerStatus.PAUSED;
    duration: number;
}
export interface TimerCompleted {
    status: TimerStatus.COMPLETED | TimerStatus.STOPPED;
    duration: null;
}
export default class Timer extends LazyPromise<undefined> {
    static create(duration: number): Timer;
    private _state;
    constructor(duration: number);
    set(duration: number): this;
    start(): this;
    pause(): this;
    stop(error?: Error): this;
}
