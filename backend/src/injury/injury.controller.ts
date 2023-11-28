import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InjuryService } from './injury.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { StudentEntity } from 'src/students/entities/student.entity';

@Controller('injury')
export class InjuryController {
  constructor(private readonly injuryService: InjuryService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('description') description: string,
    @Body('action') action: string,
    @Body('student') studentId: number,

    @Body('date') date: any,
  ) {
    const student: StudentEntity = new StudentEntity();
    student.id = studentId;



    const data = {
      description,

      student,
      action,

      date
    };

    return this.injuryService.create(data);
  }
  @Get()
  findAll() {
    return this.injuryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.injuryService.findByStudent(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuryService.update(+id, updateInjuryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuryService.remove(+id);
  }
}
