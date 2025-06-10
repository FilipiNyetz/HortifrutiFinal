import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // seu guard para validar token JWT
import { RolesGuard } from '../auth/roles.guard';       // seu guard para validar roles
import { Roles } from '../auth/roles.decorator';        // decorator para roles
import { UserRole } from '../usuario/entities/usuario.entity';

@Controller('produto')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica os guards no controller inteiro
@Roles(UserRole.LOJISTA)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get('loja/:id_loja')
  findAll(@Param('id_loja', ParseIntPipe) id_loja: number) {
    return this.produtoService.findAll(id_loja);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
