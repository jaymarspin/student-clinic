import { Module } from '@nestjs/common';
import { InjuryService } from './injury.service';
import { InjuryController } from './injury.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuryEntity } from './entities/injury.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InjuryEntity])],
  controllers: [InjuryController],
  providers: [InjuryService]
})
export class InjuryModule {}
