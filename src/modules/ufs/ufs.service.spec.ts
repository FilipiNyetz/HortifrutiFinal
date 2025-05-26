import { Test, TestingModule } from '@nestjs/testing';
import { UfsService } from './ufs.service';

describe('UfsService', () => {
  let service: UfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UfsService],
    }).compile();

    service = module.get<UfsService>(UfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
