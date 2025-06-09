import { Controller, Post, Get, Delete, Param, Body, NotFoundException, ParseIntPipe, } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) { }

  @Post()
  async create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Get()
  async findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get('loja/:id')
  async findByLoja(@Param('id', ParseIntPipe) id: number) {
    const avaliacoes = await this.avaliacaoService.findByLoja(id);
    if (!avaliacoes.length) {
      throw new NotFoundException('Nenhuma avaliação encontrada para esta loja');
    }
    return avaliacoes;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.remove(id);
  }
}
