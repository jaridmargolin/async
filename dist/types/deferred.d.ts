import Promise from './promise';
export default class Deferred<ResolveType = any> extends Promise<ResolveType> {
    private _resolve;
    private _reject;
    constructor();
    resolve(value?: ResolveType | PromiseLike<ResolveType>): void;
    reject(reason?: any): void;
}
