import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getAllBusiness: (date: any) => Observable<any>;
  getBusinessAvailabilityByDate: (bId: Number, date: any) => Observable<any>;
  getBusinessById: (bId: Number) => Observable<any>;
  updateBusiness: (data: any) => Observable<any>;

  constructor(
    @Inject('IWebRequest') private webRequest: IWebRequest,
    @Inject('IAppParams') private config: IAppParams
  ) {
    this.getAllBusiness = (date) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint +
          'business?startDate=' +
          date
      );
    };

    this.getBusinessAvailabilityByDate = (bId, date) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint +
          'business?bId=' +
          bId +
          '&startDate=' +
          date
      );
    };

    this.getBusinessById = (bId) => {
      return webRequest.get<any>(
        this.config.getParams().customRestEndPoint + 'business/' + bId
      );
    };

    this.updateBusiness = (data) => {
      return webRequest.patch<any>(
        this.config.getParams().customRestEndPoint + 'business/' + data.bId,
        data
      );
    };
  }
}
