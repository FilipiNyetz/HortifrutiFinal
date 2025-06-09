import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  create(@Body() createEstoqueDto: CreateEstoqueDto) {
    return this.estoqueService.create(createEstoqueDto);
  }

  @Get()
  findAll() {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estoque = await this.estoqueService.findOne(+id);
    if (!estoque) throw new NotFoundException();
    return estoque;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    const estoque = await this.estoqueService.update(+id, updateEstoqueDto);
    if (!estoque) throw new NotFoundException();
    return estoque;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
  await this.estoqueService.remove(id);
  }
}
