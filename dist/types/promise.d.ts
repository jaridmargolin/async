export declare type PromiseResolve<Value = any> = (value?: Value | PromiseLike<Value>) => void;
export declare type PromiseReject = (reason?: any) => void;
export declare type PromiseExecutor<ResolveType = any> = (resolve: PromiseResolve<ResolveType>, reject: PromiseReject) => void;
export default class BasePromise<ResolveType = any> {
    private _promise;
    constructor(executor: PromiseExecutor<ResolveType>);
    then(...args: Parameters<Promise<ResolveType>['then']>): Promise<unknown>;
    catch(...args: Parameters<Promise<ResolveType>['catch']>): Promise<unknown>;
    finally(...args: Parameters<Promise<ResolveType>['finally']>): Promise<ResolveType>;
}
