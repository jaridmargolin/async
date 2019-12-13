import Promise, { PromiseResolve, PromiseReject } from './promise';
export default class Deferred<ResolveType = any> extends Promise<ResolveType> {
    protected _resolve: PromiseResolve;
    protected _reject: PromiseReject;
    constructor();
}
