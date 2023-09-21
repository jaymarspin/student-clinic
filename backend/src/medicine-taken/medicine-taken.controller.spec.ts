import { Test, TestingModule } from '@nestjs/testing';
import { MedicineTakenController } from './medicine-taken.controller';
import { MedicineTakenService } from './medicine-taken.service';

describe('MedicineTakenController', () => {
  let controller: MedicineTakenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineTakenController],
      providers: [MedicineTakenService],
    }).compile();

    controller = module.get<MedicineTakenController>(MedicineTakenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
