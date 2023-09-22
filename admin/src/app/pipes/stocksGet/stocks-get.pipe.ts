import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stocksGet'
})
export class StocksGetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
