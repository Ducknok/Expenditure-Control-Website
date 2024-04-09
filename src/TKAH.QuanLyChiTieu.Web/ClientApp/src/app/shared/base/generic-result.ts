export declare class GenericResult<T> {
  success: boolean;
  error: string;
  targetURL: string;
  unAuthorizedRequest: boolean;
  __abp: boolean;
  result: T;
}
