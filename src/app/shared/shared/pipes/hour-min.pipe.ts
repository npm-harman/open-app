import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMin',
})
export class HourMinPipe implements PipeTransform {
  transform(date: any): unknown {
    if (date) {
      const d = new Date(date);
      const hr = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      return hr + ' : ' + min;
    }
    return date;
  }
}
