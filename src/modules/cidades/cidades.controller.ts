import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const Cidade = await this.cidadesService.findOne(id);
    if (!Cidade) throw new NotFoundException();
    return Cidade;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCidadeDto: UpdateCidadeDto) {
   const Cidade = await this.cidadesService.update(id, updateCidadeDto);
   if (!Cidade) throw new NotFoundException();
   return Cidade;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
  const Cidade = await this.cidadesService.remove(id);
    if (!Cidade) throw new NotFoundException();
  }
}
