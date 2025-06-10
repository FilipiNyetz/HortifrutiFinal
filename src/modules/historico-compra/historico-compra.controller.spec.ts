import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoCompraController } from './historico-compra.controller';
import { HistoricoCompraService } from './historico-compra.service';

describe('HistoricoCompraController', () => {
  let controller: HistoricoCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoCompraController],
      providers: [HistoricoCompraService],
    }).compile();

    controller = module.get<HistoricoCompraController>(HistoricoCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
