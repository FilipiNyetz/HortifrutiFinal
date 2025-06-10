import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoCompraService } from './historico-compra.service';

describe('HistoricoCompraService', () => {
  let service: HistoricoCompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoCompraService],
    }).compile();

    service = module.get<HistoricoCompraService>(HistoricoCompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
