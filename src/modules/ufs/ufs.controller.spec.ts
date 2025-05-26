import { Test, TestingModule } from '@nestjs/testing';
import { UfsController } from './ufs.controller';
import { UfsService } from './ufs.service';

describe('UfsController', () => {
  let controller: UfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UfsController],
      providers: [UfsService],
    }).compile();

    controller = module.get<UfsController>(UfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
