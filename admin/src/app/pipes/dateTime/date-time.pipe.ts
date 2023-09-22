import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(date: any): string {
    const tmpdate = moment(date); 
    return moment(tmpdate).format('LLL');
  }

}
