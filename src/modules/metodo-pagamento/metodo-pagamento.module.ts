import { Module } from '@nestjs/common';
import { MetodoPagamentoService } from './metodo-pagamento.service';
import { MetodoPagamentoController } from './metodo-pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPagamento } from './entities/metodo-pagamento.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPagamento, Usuario])],
  controllers: [MetodoPagamentoController],
  providers: [MetodoPagamentoService],
})
export class MetodoPagamentoModule {}
