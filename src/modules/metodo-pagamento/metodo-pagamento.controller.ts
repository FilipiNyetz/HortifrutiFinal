import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MetodoPagamentoService } from './metodo-pagamento.service';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';

@Controller('metodo-pagamento')
export class MetodoPagamentoController {
  constructor(
    private readonly metodoPagamentoService: MetodoPagamentoService,
  ) {}

  @Post()
  create(@Body() createMetodoPagamentoDto: CreateMetodoPagamentoDto) {
    return this.metodoPagamentoService.create(createMetodoPagamentoDto);
  }

  @Get()
  findAll() {
    return this.metodoPagamentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const metodo = await this.metodoPagamentoService.findOne(+id);
    if (!metodo) throw new NotFoundException('Método de pagamento não encontrado');
    return metodo;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMetodoPagamentoDto: UpdateMetodoPagamentoDto,
  ) {
    const metodo = await this.metodoPagamentoService.update(
      +id,
      updateMetodoPagamentoDto,
    );
    if (!metodo) throw new NotFoundException('Método de pagamento não encontrado');
    return metodo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.metodoPagamentoService.remove(+id);
    return deleted;
  }
}
