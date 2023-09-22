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
import { MedicineTakenService } from './medicine-taken.service'; 
import { UpdateMedicineTakenDto } from './dto/update-medicine-taken.dto';
import { StudentEntity } from 'src/students/entities/student.entity';
import { DosageEntity } from 'src/dosages/entities/dosage.entity';
import { InventoriesEntity } from 'src/inventories/entities/inventory.entity';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

@Controller('medicine-taken')
export class MedicineTakenController {
  constructor(private readonly medicineTakenService: MedicineTakenService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('description') description: string,
    @Body('action') action: string,
    @Body('student') studentId: number,
    @Body('quantity') quantity: number,
    @Body('dosageVal') dosageId: number,
    @Body('inventoriesVal') inventoriesId: number,
    @Body('date') date: any,
  ) {
    const student: StudentEntity = new StudentEntity();
    student.id = studentId;

    const inventories: InventoriesEntity = new InventoriesEntity();
    inventories.id = inventoriesId;

    const dosage: DosageEntity = new DosageEntity();
    dosage.id = dosageId;
    const data = {
      description,
      dosage,
      student,
      action,
      quantity,
      inventories,
      date
    };

    return this.medicineTakenService.create(data);
  }

  @Get()
  findAll() {
    return this.medicineTakenService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicineTakenService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineTakenService.remove(+id);
  }
}
