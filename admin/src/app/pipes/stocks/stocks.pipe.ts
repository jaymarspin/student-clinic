import { Pipe, PipeTransform } from '@angular/core';
import { Stocks } from 'src/app/interfaces/inventories.interface';

@Pipe({
  name: 'stocks'
})
export class StocksPipe implements PipeTransform {

  transform(stocks: Stocks): unknown {
    console.log(stocks)
    return null;
  }

}
