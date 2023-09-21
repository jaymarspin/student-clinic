import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicineTakenService } from './medicine-taken.service';
import { CreateMedicineTakenDto } from './dto/create-medicine-taken.dto';
import { UpdateMedicineTakenDto } from './dto/update-medicine-taken.dto';
import { StudentEntity } from 'src/students/entities/student.entity';
import { DosageEntity } from 'src/dosages/entities/dosage.entity';

@Controller('medicine-taken')
export class MedicineTakenController {
  constructor(private readonly medicineTakenService: MedicineTakenService) {}

  @Post()
  create(
    @Body('description') description: string,
    @Body('action') action: string,
    @Body('student') studentId: number,
    @Body('dosageVal') dosageId: number,
    @Body('quantity') quantity: number,
  ) {
    const student: StudentEntity = new StudentEntity();
    student.id = studentId;

    const dosage: DosageEntity = new DosageEntity();
    dosage.id = dosageId;
    const data = {
      description,
      dosage,
      student,
      action,
      quantity
    };

    return this.medicineTakenService.create(data);
  }

  @Get()
  findAll() {
    return this.medicineTakenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicineTakenService.findOne(id);
  }

  @Get('student/:id')
  findByStudent(@Param('id') id: number) {
    return this.medicineTakenService.findByStudent(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineTakenDto: UpdateMedicineTakenDto,
  ) {
    return this.medicineTakenService.update(+id, updateMedicineTakenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineTakenService.remove(+id);
  }
}
