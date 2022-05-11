import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root',
})
export class BusinessHoursService {
  add: (data: any) => Observable<any>;
  get: (bId: Number) => Observable<any>;

  constructor(
    @Inject('IWebRequest') private webRequest: IWebRequest,
    @Inject('IAppParams') private config: IAppParams
  ) {
    this.add = (data) => {
      return webRequest.post<any>(
        this.config.getParams().customRestEndPoint + 'businness-hours',
        data
      );
    };

    this.get = (bId) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint +
          'businness-hours?bId=' +
          bId
      );
    };
  }
}
