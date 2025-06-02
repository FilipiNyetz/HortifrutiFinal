import { Module } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity'
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from '../endereco/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Endereco])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule { }
