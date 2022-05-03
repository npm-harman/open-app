import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root',
})
export class BusinessSignupService {
  public currentUser: BehaviorSubject<any>;

  registerBusiness: (data: any) => Observable<any>;
  signin: (data: any) => Observable<any>;

  constructor(
    @Inject('IWebRequest') private webRequest: IWebRequest,
    @Inject('IAppParams') private config: IAppParams
  ) {
    this.registerBusiness = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'bussiness-sign-up',
        data
      );
    };
    this.signin = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'sign-in',
        data
      );
    };
    this.currentUser = new BehaviorSubject<any>(null);
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
  public setCurrentUser(newValue: any): void {
    this.currentUser.next(newValue);
  }
}
