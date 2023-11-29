import { Injectable } from '@nestjs/common'; 
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { StocksEntity } from './entities/stock.entity';
import * as moment from "moment";
 

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StocksEntity)
    private readonly stocks: Repository<StocksEntity>,
  ) {}
  create(stocks:StocksEntity) {
    return this.stocks.save(stocks);
  }


  findAllIncoming(startDate, endDate) {
    console.log(startDate),
    console.log(endDate)
    startDate = moment(startDate).subtract(1, 'seconds').format();
    endDate = moment(endDate).add(1, 'seconds').format();
 

    return this.stocks.find({
      relations: [
        'dosage',
        'dosage.inventories',
      ],
      where: {
        created_at: Between(startDate, endDate),
        
      },
      order: {
        created_at: 'desc',
      },
    });
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
