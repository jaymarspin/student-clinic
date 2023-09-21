import { Module } from '@nestjs/common';
import { MedicineTakenService } from './medicine-taken.service';
import { MedicineTakenController } from './medicine-taken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineTakenEntity } from './entities/medicine-taken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineTakenEntity])],
  controllers: [MedicineTakenController],
  providers: [MedicineTakenService]
})
export class MedicineTakenModule {}
