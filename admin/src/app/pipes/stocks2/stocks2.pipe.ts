import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';
@Pipe({
  name: 'stocks2',
})
export class Stocks2Pipe implements PipeTransform {
  transform(stocks: Stocks[]): unknown {
    let tmp = 0;
    for (let index = 0; index < stocks.length; index++) {
      tmp += stocks[index].stocks;
    }
    return tmp;
  }
}
