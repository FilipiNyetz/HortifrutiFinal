import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Categoria = await this.categoriaService.findOne(id);
    if (!Categoria) throw new NotFoundException();
    return Categoria;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    const Categoria = await this.categoriaService.update(id, updateCategoriaDto);
    if (!Categoria) throw new NotFoundException();
    return Categoria;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const Categoria = await this.categoriaService.remove(id);
    if (!Categoria) throw new NotFoundException();
  }
}
