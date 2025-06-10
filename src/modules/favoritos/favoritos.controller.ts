/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
 
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';

@Controller('favoritos')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritosService) {}

  @Post()
  async create(@Body() createFavoritoDto: CreateFavoritoDto) {
    console.log('DTO recebido no create:', createFavoritoDto);
    return await this.favoritoService.favoritar(createFavoritoDto);
  }

  @Get()
  async findAll() {
    return await this.favoritoService.findAll();
  }

  @Get('usuario/:id')
  async findByUsuario(@Param('id', ParseIntPipe) id: number) {
    const favoritos = await this.favoritoService.findByUsuario(id);
     
    if (!favoritos.length) {
      throw new NotFoundException('Nenhum favorito encontrado para este usuário');
    }
    return favoritos;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.favoritoService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFavoritoDto: CreateFavoritoDto, // ideal criar um DTO específico para update se for diferente
  ) {
    console.log('DTO recebido no update:', updateFavoritoDto);
    return await this.favoritoService.update(id, updateFavoritoDto);
  }
}
