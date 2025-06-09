import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe
} from '@nestjs/common';
import { FavoritoService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';

@Controller('favoritos')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) { }

  @Post()
  async create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return await this.favoritoService.create(createFavoritoDto);
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
}
