import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonService, IWebRequest } from './iapp.config';

@Injectable()
export class WebRequest implements IWebRequest {
  get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  postImage: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  postFile: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  putFile: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  put: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  delete: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<HttpEvent<T>>;
  requestDataFromMultipleSources: <T>(inputArray?: any) => Observable<any[]>;

  constructor(private http: HttpClient, @Inject('ICommonService') private commonService: ICommonService) {
    const vm = this;

    vm.get = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('get', url, data, vm.commonService.getRequestHeader());
      return vm.http.get<T>(url, options);
    };

    vm.post = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('post', url, {}, header ? header : vm.commonService.getRequestHeader());
      return vm.http.post<T>(url, data, options);
    };

    vm.put = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('put', url, {}, header ? header : vm.commonService.getRequestHeader());
      return vm.http.put<T>(url, data, options);
    };

    vm.delete = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('delete', url, {}, header ? header : vm.commonService.getRequestHeader());
      return vm.http.delete<T>(url, options);
    };
    vm.postImage = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('post', url, {}, header ? header : vm.commonService.getRequestImageHeader());
      return vm.http.post<T>(url, data, options);
    };
    vm.postFile = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options:any = vm.getRequestOption('post', url, {}, header ? header : vm.commonService.getRequestFileHeader());
      return vm.http.post<T>(url, data, options);
    };
    vm.putFile = <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => {
      const options: any = vm.getRequestOption('put', url, {}, header ? header : vm.commonService.getRequestFileHeader());
      return vm.http.put<T>(url, data, options);
    };
  }
  private genParams(params: object, httpParams = new HttpParams()): object {
    (Object.keys(params)as Array<keyof typeof params>)
      .filter(key => {
        const v: any = params[key];
        return (Array.isArray(v) || typeof v === 'string') ?
          (v.length > 0) :
          (v !== null && v !== undefined);
      })
      .forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    return { params: httpParams };
  }
  private getRequestOption(method: any, url: string, data?: any, header?: any) {

    const httpParams = new HttpParams();

    const options = {
      headers: header,
      responseType: 'json',
      params: httpParams
    };
    const opts = Object.assign({}, options, data ? this.genParams(data, options.params) : null);

    return opts;

  }
}
