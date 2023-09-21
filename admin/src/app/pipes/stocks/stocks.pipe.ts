import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';
import * as _ from 'lodash';
@Pipe({
  name: 'stocks',
})
export class StocksPipe implements PipeTransform {
  transform(stocks: Stocks[]): unknown {
    let tmp = 0;
    for (let index = 0; index < stocks.length; index++) {
      tmp += stocks[index].stocks;
    }
    return tmp;
  }
}
