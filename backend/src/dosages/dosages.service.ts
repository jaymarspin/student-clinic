import { Injectable } from '@nestjs/common';
import { CreateDosageDto } from './dto/create-dosage.dto';
import { UpdateDosageDto } from './dto/update-dosage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DosageEntity } from './entities/dosage.entity';

@Injectable()
export class DosagesService {

  constructor(
    @InjectRepository(DosageEntity)
    private readonly dosage: Repository<DosageEntity>,
  ) {}
  create(data) {
    return this.dosage.save(data);
  }

  findAll() {
    return `This action returns all dosages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dosage`;
  }

  update(id: number, updateDosageDto: UpdateDosageDto) {
    return `This action updates a #${id} dosage`;
  }

  remove(id: number) {
    return `This action removes a #${id} dosage`;
  }
}
