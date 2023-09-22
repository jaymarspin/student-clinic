import { Injectable } from '@nestjs/common';
import { CreateMedicineTakenDto } from './dto/create-medicine-taken.dto';
import { UpdateMedicineTakenDto } from './dto/update-medicine-taken.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineTakenEntity } from './entities/medicine-taken.entity';
import { StudentEntity } from 'src/students/entities/student.entity';

@Injectable()
export class MedicineTakenService {
  constructor(
    @InjectRepository(MedicineTakenEntity)
    private readonly medicineTake: Repository<MedicineTakenEntity>,
  ) {}
  create(data) {
    return this.medicineTake.save(data);
  }

  findAll() {
    return `This action returns all medicineTaken`;
  }

  findOne(id: number) {
    return this.medicineTake.findOneBy({ id: id });
  }

  findByStudent(id: number) {
    const student = new StudentEntity();
    student.id = id;
    return this.medicineTake.find({
      where: { student: student },
      relations: ['dosage', 'inventories'],
      order: { created_at: 'DESC' },
    });
  }

  update(id: number, updateMedicineTakenDto: UpdateMedicineTakenDto) {
    return `This action updates a #${id} medicineTaken`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineTaken`;
  }
}
