/* eslint-disable @typescript-eslint/await-thenable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto) {
    return this.entregaService.create(createEntregaDto);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entrega = await this.entregaService.findOne(+id);
    if (!entrega) throw new NotFoundException('Entrega não encontrada');
    return entrega;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEntregaDto: UpdateEntregaDto,
  ) {
    const entrega = await this.entregaService.update(+id, updateEntregaDto);
    if (!entrega) throw new NotFoundException('Entrega não encontrada');
    return entrega;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const entrega = await this.entregaService.remove(+id);
    if (!entrega) throw new NotFoundException('Entrega não encontrada');
  }
}
