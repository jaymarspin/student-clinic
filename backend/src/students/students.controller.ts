import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';  
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { StudentEntity } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('bdate') bdate: any,
    @Body('grade') grade: string,
    @Body('emergencyContactNo') emergencyContactNo: string,
    @Body('date_added') date_added: string,
    @Body('notes') notes: string,
    @Body('graderole') graderole: string,
  ) {
    return this.studentsService.create({
      fullname,
      email,
      bdate,
      grade,
      emergencyContactNo,
      date_added,
      notes,
      graderole
    });
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() student: StudentEntity) {
    return this.studentsService.update(+id, student);
  }


  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
