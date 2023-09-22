import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DosagesService } from './dosages.service';
import { CreateDosageDto } from './dto/create-dosage.dto';
import { UpdateDosageDto } from './dto/update-dosage.dto';
import { InventoriesEntity } from 'src/inventories/entities/inventory.entity';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

@Controller('dosages')
export class DosagesController {
  constructor(private readonly dosagesService: DosagesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body('dosage') dosage:string,@Body('inventory') inventory:number  ) {
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dosagesService.remove(+id);
  }
}
