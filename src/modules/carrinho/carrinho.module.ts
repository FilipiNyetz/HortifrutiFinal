import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { Carrinho} from './entities/carrinho.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrinho, Produto])],
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
})
export class CarrinhoModule {}
