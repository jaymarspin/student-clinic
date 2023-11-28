import { Injectable } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjuryEntity } from './entities/injury.entity';
import { StudentEntity } from 'src/students/entities/student.entity';

@Injectable()
export class InjuryService {
  constructor(
    @InjectRepository(InjuryEntity)
    private readonly Injury: Repository<InjuryEntity>,
  ) {}
  create(data ) {
    return this.Injury.save(data);
  }

  findAll() {
    return `This action returns all injury`;
  }

  
  findByStudent(id: number) {
    const student = new StudentEntity();
    student.id = id;
    return this.Injury.find({
      where: { student: student },
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} injury`;
  }

  update(id: number, updateInjuryDto: UpdateInjuryDto) {
    return `This action updates a #${id} injury`;
  }

  remove(id: number) {
    return `This action removes a #${id} injury`;
  }
}
