import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUser: (data: any) => Observable<any>;
  bookAppointment: (data: any) => Observable<any>;
  getAllAppointments: (data: any) => Observable<any>;


  constructor(@Inject('IWebRequest') private webRequest: IWebRequest,
  @Inject('IAppParams') private config: IAppParams) { 

    this.registerUser = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'sign-up',
        data
      );
    };

    this.bookAppointment = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'appointments/book',
        data
      );
    };

    this.getAllAppointments = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'sign-up',
        data
      );
    };
  }
}
