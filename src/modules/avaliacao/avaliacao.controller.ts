import { Controller, Post, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @Post('avaliar-compra')
  async avaliarCompra(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacaoService.avaliarCompra(dto);
  }
}
