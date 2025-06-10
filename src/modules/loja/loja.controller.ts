import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  // seu guard para validar token JWT
import { RolesGuard } from '../auth/roles.guard';       // seu guard para validar roles
import { Roles } from '../auth/roles.decorator';        // decorator para roles
import { UserRole } from '../usuario/entities/usuario.entity';

@Controller('loja')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica os guards no controller inteiro
@Roles(UserRole.LOJISTA)               // Só usuários lojistas podem acessar
export class LojaController {
  constructor(private readonly lojaService: LojaService) { }

  @Post()
  create(@Body() createLojaDto: CreateLojaDto) {
    return this.lojaService.create(createLojaDto);
  }

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lojaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lojaService.remove(id);
  }
}
