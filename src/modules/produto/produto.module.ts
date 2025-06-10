import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Loja } from '../loja/entities/loja.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, Categoria, Carrinho]), AuthModule],
  controllers: [ProdutoController],
  providers: [ProdutoService], // adicione aqui
})
export class ProdutoModule { }
