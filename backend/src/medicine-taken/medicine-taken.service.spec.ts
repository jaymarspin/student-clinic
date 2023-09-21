import { Test, TestingModule } from '@nestjs/testing';
import { MedicineTakenService } from './medicine-taken.service';

describe('MedicineTakenService', () => {
  let service: MedicineTakenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineTakenService],
    }).compile();

    service = module.get<MedicineTakenService>(MedicineTakenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
