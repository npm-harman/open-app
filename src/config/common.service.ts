import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { ICommonService } from './iapp.config';

@Injectable()
export class CommonService implements ICommonService {
    constructor(@Inject(LOCALE_ID) private locale: string) { }
    public empName = '';
    public mode = '';
    public getRequestHeader = () => {

        const header = {
            'Content-Type': 'application/json'
        };
        // const headers = new HttpHeaders(header);
        return header;
    }

    public getRequestFileHeader = () => {
        const header = {
            'Authorization': ''

        };
        return header;
    }

    public getRequestImageHeader = () => {
        const header = {
            'Authorization': ''
        };
        return header;
    }
}
