import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DosagesService } from './dosages.service';
import { CreateDosageDto } from './dto/create-dosage.dto';
import { UpdateDosageDto } from './dto/update-dosage.dto';
import { InventoriesEntity } from 'src/inventories/entities/inventory.entity';

@Controller('dosages')
export class DosagesController {
  constructor(private readonly dosagesService: DosagesService) {}

  @Post()
  create(@Body('dosage') dosage:string,@Body('inventory') inventory:string  ) {
    const inventories:InventoriesEntity = new InventoriesEntity()
    inventories.id = inventory
    return this.dosagesService.create({dosage,inventories: inventories});
  }

  @Get()
  findAll() {
    return this.dosagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dosagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDosageDto: UpdateDosageDto) {
    return this.dosagesService.update(+id, updateDosageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dosagesService.remove(+id);
  }
}
