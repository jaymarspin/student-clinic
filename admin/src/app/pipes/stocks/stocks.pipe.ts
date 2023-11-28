import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';
import * as _ from 'lodash';
@Pipe({
  name: 'stocks',
})
export class StocksPipe implements PipeTransform {
  transform(stocks: Stocks[], taken?: any, dosageId?: number): number {
    let tmp = 0;
    let minus = 0;

    for (let index = 0; index < stocks.length; index++) {
      tmp += stocks[index].stocks;
    }

    if (taken) {
      for (let x = 0; x < taken.length; x++) {
        if (dosageId === taken[x].dosage.id) {
          minus += taken[x].quantity;
        }
      }
    }
  
    return tmp - minus;
  }
}
