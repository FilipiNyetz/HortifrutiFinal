import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) { }

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
    const cidade = await this.cidadesService.findOne(id);
    if (!cidade) throw new NotFoundException();
    return cidade;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCidadeDto: UpdateCidadeDto) {
    const cidade = await this.cidadesService.update(id, updateCidadeDto);
    if (!cidade) throw new NotFoundException();
    return cidade;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const cidade = await this.cidadesService.remove(id);
    if (!cidade) throw new NotFoundException();
  }

}
