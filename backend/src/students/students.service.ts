import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(StudentEntity)
    private readonly students: Repository<StudentEntity>,
  ) {}
  create(data) {
    return this.students.save(data);
  }

  findAll() {
    return this.students.find({order: {fullname: 'ASC'}});
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
