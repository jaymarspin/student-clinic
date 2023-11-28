import { CountStocksPipe } from './count-stocks.pipe';

describe('CountStocksPipe', () => {
  it('create an instance', () => {
    const pipe = new CountStocksPipe();
    expect(pipe).toBeTruthy();
  });
});
