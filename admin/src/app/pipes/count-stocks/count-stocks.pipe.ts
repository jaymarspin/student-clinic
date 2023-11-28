import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';

@Pipe({
  name: 'countStocks'
})
export class CountStocksPipe implements PipeTransform {

  transform(stocks: Stocks[]): unknown {
    let tmp = 0;
    let minus = 0;

    for (let index = 0; index < stocks.length; index++) {
      tmp += stocks[index].stocks;
    }

 
  
    return tmp;
  }

}
