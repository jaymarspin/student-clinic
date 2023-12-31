import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';
@Pipe({
  name: 'stocks2',
})
export class Stocks2Pipe implements PipeTransform {
  transform(stocks: Stocks[], taken?: any, dosageId?: number): unknown {
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
