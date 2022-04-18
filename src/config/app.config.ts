import { InjectionToken } from '@angular/core';
import { IAppParams } from './iapp.config';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export let APP_CONFIG = new InjectionToken('app.config');

@Injectable()
export class AppParams implements IAppParams {
  public getParams() {
    return environment;
  }
}
