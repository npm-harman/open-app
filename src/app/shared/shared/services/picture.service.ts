import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppParams, IWebRequest } from 'src/config/iapp.config';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  upload: (data: any) => Observable<any>;

  constructor(
    @Inject('IWebRequest') private webRequest: IWebRequest,
    @Inject('IAppParams') private config: IAppParams
  ) {
    this.upload = (data) => {
      return webRequest.postFile<any>(
        this.config.getParams().customRestEndPoint + 'file',
        data
      );
    };
  }
}
