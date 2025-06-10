import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoricoCompra } from './entities/historico-compra.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';

import { HistoricoCompraService } from './historico-compra.service';
import { HistoricoCompraController } from './historico-compra.controller';
import { MetodoPagamento } from '../metodo-pagamento/entities/metodo-pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoCompra, Usuario, Carrinho, MetodoPagamento])],
  controllers: [HistoricoCompraController],
  providers: [HistoricoCompraService],
})
export class HistoricoCompraModule { }
