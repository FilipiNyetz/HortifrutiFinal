import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Endereco } from '../endereco/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja,Endereco])],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule { }
