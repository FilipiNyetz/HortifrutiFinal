import { Test, TestingModule } from '@nestjs/testing';
import { ItensCarrinhoService } from './itens-carrinho.service';

describe('ItensCarrinhoService', () => {
  let service: ItensCarrinhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItensCarrinhoService],
    }).compile();

    service = module.get<ItensCarrinhoService>(ItensCarrinhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
