import { PromiseResolve, PromiseReject } from './promise';
import LazyPromise from './lazy-promise';
export default class Deferred<ResolveType = any> extends LazyPromise<ResolveType> {
    resolve(...args: Parameters<PromiseResolve>): void;
    reject(...args: Parameters<PromiseReject>): void;
}
