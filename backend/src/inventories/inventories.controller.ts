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
import { InventoriesService } from './inventories.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { DosagesService } from 'src/dosages/dosages.service';
import { InventoriesEntity } from './entities/inventory.entity';
import { DosageEntity } from 'src/dosages/entities/dosage.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { StocksEntity } from 'src/stocks/entities/stock.entity';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

@Controller('inventories')
export class InventoriesController {
  constructor(
    private readonly inventoriesService: InventoriesService,
    private dosagesService: DosagesService,
    private stocksService: StocksService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('medicinename') medicinename: string,
    @Body('indication') indication: string,
    @Body('dosage') dosage: DosageEntity[],
    @Body('stocks') stocks: StocksEntity[],
    @Body('inventoryid') inventoryid?: any,
    @Body('maxcount') maxcount?: any,
  ) {
    if (inventoryid) {
      const inventories: InventoriesEntity = new InventoriesEntity();
      inventories.id = inventoryid;
      const dos:DosageEntity = await this.dosagesService.create({ dosage, inventories: inventories });
      return this.inventoriesService.create({ medicinename, indication,maxcount });
    } else {
      const inventories: InventoriesEntity = new InventoriesEntity();
      inventories.id = inventoryid;

      const inventory = await this.inventoriesService.create({
        medicinename,
        indication,
        maxcount
      });
      if(dosage.length > 0){
        for (let index = 0; index < dosage.length; index++) {
          const dos:DosageEntity = await this.dosagesService.create({ dosage: dosage[index].dosage, inventories: inventory });
          await this.stocksService.create({
            stocks: +stocks[index].stocks, dosage: dos, 
          })
        }
      }
      
      return inventory;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoriesService.update(+id, updateInventoryDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoriesService.remove(+id);
  }
}
