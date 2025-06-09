import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './entities/estoque.entity';
import { Loja } from '../loja/entities/loja.entity';
import { Produto } from '../produto/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estoque, Loja, Produto]),
  ],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
