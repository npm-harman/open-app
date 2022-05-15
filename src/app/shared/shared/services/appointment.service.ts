import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  getAllByUserId: (id: Number) => Observable<any>;
  getAllByBusinessId: (id: Number) => Observable<any>;
  bookAppointment: (data: any) => Observable<any>;
  delete: (id: Number) => Observable<any>;
  public listChange: BehaviorSubject<any>;

  constructor(@Inject('IWebRequest') private webRequest: IWebRequest,
  @Inject('IAppParams') private config: IAppParams) { 

    this.listChange = new BehaviorSubject<any>(null);

    this.getAllByUserId = (id) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'appointments?uId='+id
      );
    };

    this.getAllByBusinessId = (id) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'appointments?bId='+id
      );
    };

    this.bookAppointment = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'appointments/book',
        data
      );
    };

    this.delete = (id) => {
      return webRequest.delete<any>(
        this.config.getParams().customRestEndPoint + 'appointments/'+ id
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
