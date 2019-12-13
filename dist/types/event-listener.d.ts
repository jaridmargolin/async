import LazyPromise from './lazy-promise';
export declare type EventEmitter = {
    on: (event: string | symbol, listener: (...args: any[]) => void) => EventEmitter;
    off: (event: string | symbol, listener: (...args: any[]) => void) => EventEmitter;
};
export declare enum EventListenerStatus {
    PENDING = 0,
    RESOLVED = 1,
    REJECTED = 2
}
export default class EventListener<Target extends EventEmitter> extends LazyPromise<any> {
    static create<Target extends EventEmitter>(target: Target, event: string | symbol): EventListener<Target>;
    private _status;
    private _target;
    private _event;
    constructor(target: Target, event: string | symbol);
    private _onEvent;
    cancel(error?: Error): void;
}
