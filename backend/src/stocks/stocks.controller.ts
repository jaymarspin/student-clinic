import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { DosageEntity } from 'src/dosages/entities/dosage.entity';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body('stocks') stocks: string,@Body('dosage') dosageval: string, ) {
    const dosage = new DosageEntity()
    dosage.id = +dosageval
    return this.stocksService.create({
      stocks: +stocks,dosage
    })
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
