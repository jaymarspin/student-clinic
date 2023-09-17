import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesEntity } from './entities/inventory.entity';
import { DosagesModule } from 'src/dosages/dosages.module';
import { StocksModule } from 'src/stocks/stocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoriesEntity]),
    DosagesModule,
    StocksModule,
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
