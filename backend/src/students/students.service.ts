import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from './entities/student.entity';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(StudentsEntity)
    private readonly students: Repository<StudentsEntity>,
  ) {}
  create(data) {
    return this.students.save(data);
  }

  findAll() {
    return this.students.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
