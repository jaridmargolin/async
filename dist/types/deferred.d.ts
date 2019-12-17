import Promise, { PromiseResolve, PromiseReject } from './promise';
export default class Deferred<ResolveType = any> extends Promise<ResolveType> {
    private _resolve;
    private _reject;
    constructor();
    resolve(...args: Parameters<PromiseResolve>): void;
    reject(...args: Parameters<PromiseReject>): void;
}
