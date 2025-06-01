import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja])],
  controllers: [ProdutoController],
  providers: [ProdutoService], // adicione aqui
})
export class ProdutoModule { }
