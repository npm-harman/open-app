import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  add: (data: any) => Observable<any>;
  update: (data: any) => Observable<any>;
  getAll: (bId: Number) => Observable<any>;
  getById: (data: any) => Observable<any>;
  deleteById: (data: any) => Observable<any>;
  public listChange: BehaviorSubject<any>;
  
  constructor(@Inject('IWebRequest') private webRequest: IWebRequest,
  @Inject('IAppParams') private config: IAppParams) { 
    this.listChange = new BehaviorSubject<any>(null);

    this.add = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'business/'+ data.bId + '/staff',
        data
      );
    };

    this.getAll = (bId) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'business/'+ bId + '/staff',
      );
    };

    this.getById = (data) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'business/'+ data.bId + '/staff/' + data.id,
      );
    };

    this.update = (data) => {
      return webRequest.patch<any>(
        this.config.getParams().customRestEndPoint + 'business/'+ data.bId + '/staff/' + data.id ,
        data
      );
    };

    this.deleteById = (data) => {
      return webRequest.patch<any>(
        this.config.getParams().customRestEndPoint + 'business/'+ data.bId + '/staff/' + data.id +'/delete',
      );
    };

  }
  public getListChange(): Observable<any> {
    return this.listChange.asObservable();
  }
  public setListChange(newValue: any): void {
    this.listChange.next(newValue);
  }
}
