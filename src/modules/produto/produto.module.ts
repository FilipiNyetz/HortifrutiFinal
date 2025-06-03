import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Loja } from '../loja/entities/loja.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, Categoria, Carrinho])],
  controllers: [ProdutoController],
  providers: [ProdutoService], // adicione aqui
})
export class ProdutoModule { }
