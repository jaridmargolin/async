export declare type PromiseResolve<Value = any> = (value?: Value | PromiseLike<Value>) => void;
export declare type PromiseReject = (reason?: any) => void;
export declare type PromiseExecutor<ResolveType = any> = (resolve: PromiseResolve<ResolveType>, reject: PromiseReject) => void;
export declare type PromiseOnFulfilled<InputType, OutputType> = ((value: InputType) => OutputType | PromiseLike<OutputType>) | undefined | null;
export declare type PromiseOnRejected<OutputType> = ((reason: any) => OutputType | PromiseLike<OutputType>) | undefined | null;
export declare type PromiseOnFinally = (() => void) | undefined | null;
export default class BasePromise<ResolveType = any> {
    private _promise;
    constructor(executor: PromiseExecutor<ResolveType>);
    then<TResult1 = ResolveType, TResult2 = never>(onfulfilled?: PromiseOnFulfilled<ResolveType, TResult1>, onrejected?: PromiseOnRejected<TResult2>): Promise<TResult1 | TResult2>;
    catch<TResult>(onrejected?: PromiseOnRejected<TResult>): Promise<ResolveType | TResult>;
    finally(onfinally?: PromiseOnFinally): Promise<ResolveType>;
}
