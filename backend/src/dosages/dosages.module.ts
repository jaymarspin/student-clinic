import { Module } from '@nestjs/common';
import { DosagesService } from './dosages.service';
import { DosagesController } from './dosages.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DosageEntity } from './entities/dosage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DosageEntity])],
  controllers: [DosagesController],
  providers: [DosagesService],
  exports:[DosagesService]
})
export class DosagesModule {}
