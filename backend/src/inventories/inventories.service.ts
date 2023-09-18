import { Injectable } from '@nestjs/common';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoriesEntity } from './entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(InventoriesEntity)
    private readonly inventories: Repository<InventoriesEntity>,
  ) {}

  create(data) {
    return this.inventories.save(data);
  }

  findAll() {
    return this.inventories.find({ relations: ['dosage', 'dosage.stocks'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
