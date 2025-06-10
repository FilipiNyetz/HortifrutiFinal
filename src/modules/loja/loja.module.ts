import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { AuthModule } from '../auth/auth.module';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja, Endereco, Usuario]), AuthModule],
  controllers: [LojaController],
  providers: [LojaService],
})
export class LojaModule { }
