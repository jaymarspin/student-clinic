import { Injectable } from '@nestjs/common'; 
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StocksEntity } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StocksEntity)
    private readonly stocks: Repository<StocksEntity>,
  ) {}
  create(stocks:StocksEntity) {
    return this.stocks.save(stocks);
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
