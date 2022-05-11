import { Observable } from 'rxjs';

export interface IAppParams {
  getParams: () => IApplConfig;
}

export interface IApplConfig {
  production: boolean;
  customRestEndPoint: string;
}

export interface IWebRequest {
  get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  put: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  patch: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  delete: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  postFile: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  putFile: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<any>;
  requestDataFromMultipleSources: <T>(inputArray?: any) => Observable<any[]>;
}

export interface ICommonService {
  getRequestHeader: () => any;
  getRequestImageHeader: () => any;
  getRequestFileHeader: () => any;
  getAuthToken?: () => any;
  empName: string;
}

