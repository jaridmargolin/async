import Promise from './promise';
export declare type EventEmitter = {
    on: (event: string, listener: (...args: any[]) => void) => EventEmitter;
    off: (event: string, listener: (...args: any[]) => void) => EventEmitter;
};
export declare enum EventListenerStatus {
    PENDING = 0,
    RESOLVED = 1,
    REJECTED = 2
}
export default class EventListener<Target extends EventEmitter> extends Promise<any> {
    static create<Target extends EventEmitter>(target: Target, event: string): EventListener<Target>;
    private _status;
    private _resolve;
    private _reject;
    private _target;
    private _event;
    private _onEvent;
    constructor(target: Target, event: string);
    cancel(error?: Error): void;
}
