import { Module } from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { ItensCarrinhoController } from './itens-carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCarrinho } from './entities/itens-carrinho.entity';
import { ProdutoModule } from '../produto/produto.module';
import { CarrinhoModule } from '../carrinho/carrinho.module';
import { Produto } from '../produto/entities/produto.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemCarrinho, Produto, Carrinho]), ProdutoModule, CarrinhoModule,
  ],
  controllers: [ItensCarrinhoController],
  providers: [ItensCarrinhoService],
})
export class ItensCarrinhoModule { }
