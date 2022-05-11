import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUser: (data: any) => Observable<any>;

  constructor(@Inject('IWebRequest') private webRequest: IWebRequest,
  @Inject('IAppParams') private config: IAppParams) { 
    this.registerUser = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'sign-up',
        data
      );
    };
  }
}
