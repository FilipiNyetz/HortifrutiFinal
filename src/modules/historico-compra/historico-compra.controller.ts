import { Controller, Post, Body } from '@nestjs/common';
import { HistoricoCompraService } from './historico-compra.service';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { HistoricoCompra } from './entities/historico-compra.entity';

@Controller('historico-compra')
export class HistoricoCompraController {
  constructor(private readonly historicoCompraService: HistoricoCompraService) { }

  @Post('pagar')
  async pagar(@Body() dto: CreateHistoricoCompraDto): Promise<HistoricoCompra> {
    return this.historicoCompraService.pagar(dto);
  }
}
