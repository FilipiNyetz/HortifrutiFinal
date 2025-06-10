import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorito } from './entities/favorito.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Produto } from 'src/modules/produto/entities/produto.entity';
import { FavoritosService } from './favoritos.service';
import { FavoritoController } from './favoritos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorito, Usuario, Produto]),
  ],
  controllers: [FavoritoController],
  providers: [FavoritosService],
})
export class FavoritoModule { }
