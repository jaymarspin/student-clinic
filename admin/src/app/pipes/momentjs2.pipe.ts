import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentjs2',
})
export class Momentjs2Pipe implements PipeTransform {
  transform(date: any): string {
    const tmpdate = moment(date);
    return moment(tmpdate).format('MMM Do YY');
  }
}
