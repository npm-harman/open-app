import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {

  add: (data: any) => Observable<any>;
  update: (data: any) => Observable<any>;
  getAll: (bId: Number) => Observable<any>;
  getById: (id: any) => Observable<any>;
  deleteById: (id: any) => Observable<any>;
  public serviceListChange: BehaviorSubject<any>;

  constructor( @Inject('IWebRequest') private webRequest: IWebRequest,
  @Inject('IAppParams') private config: IAppParams) { 
    this.serviceListChange = new BehaviorSubject<any>(null);

    this.add = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'business-services',
        data
      );
    };

    this.getAll = (bId) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'business-services?bId='+bId
      );
    };

    this.getById = (id) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'business-services/' + id
      );
    };

    this.update = (data) => {
      return webRequest.patch<any>(
        this.config.getParams().customRestEndPoint + 'business-services/' + data.id,
        data
      );
    };

    this.deleteById = (id) => {
      return webRequest.delete<any>(
        this.config.getParams().customRestEndPoint + 'business-services/' + id,
      );
    };
  }

  public getServiceListChange(): Observable<any> {
    return this.serviceListChange.asObservable();
  }
  public setServiceListChange(newValue: any): void {
    this.serviceListChange.next(newValue);
  }
}
