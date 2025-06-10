import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // seu guard para validar token JWT
import { RolesGuard } from '../auth/roles.guard';       // seu guard para validar roles
import { Roles } from '../auth/roles.decorator';        // decorator para roles
import { UserRole } from '../usuario/entities/usuario.entity';
import { Produto } from './entities/produto.entity';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LOJISTA)
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('loja/:id_loja')
  findAllByLoja(@Param('id_loja', ParseIntPipe) id_loja: number) {
    return this.produtoService.findAllByLoja(id_loja);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LOJISTA)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LOJISTA)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
