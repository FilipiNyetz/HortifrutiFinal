import { Test, TestingModule } from '@nestjs/testing';
import { FavoritoController } from './favoritos.controller';
import { FavoritoService } from './favoritos.service';

describe('FavoritosController', () => {
  let controller: FavoritoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritoController],
      providers: [FavoritoService],
    }).compile();

    controller = module.get<FavoritoController>(FavoritoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
