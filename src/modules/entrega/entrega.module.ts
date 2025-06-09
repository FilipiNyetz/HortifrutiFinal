import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';
import { Entrega } from './entities/entrega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Endereco, Carrinho, Entrega])
  ],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
