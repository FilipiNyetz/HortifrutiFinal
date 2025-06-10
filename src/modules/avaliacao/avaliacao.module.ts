import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';
import { HistoricoCompra } from '../historico-compra/entities/historico-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao, Usuario, HistoricoCompra, Loja])],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
})
export class AvaliacaoModule { }
