import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { HistoricoCompraService } from './historico-compra.service';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { HistoricoCompra } from './entities/historico-compra.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../usuario/entities/usuario.entity';

@Controller('historico-compra')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica os guards no controller inteiro
@Roles(UserRole.USER)
export class HistoricoCompraController {
  constructor(private readonly historicoCompraService: HistoricoCompraService) { }

  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: number) {
    return this.historicoCompraService.findByUsuario(usuarioId);
  }

  @Post('pagar')
  async pagar(@Body() dto: CreateHistoricoCompraDto): Promise<HistoricoCompra> {
    return this.historicoCompraService.pagar(dto);
  }
}
