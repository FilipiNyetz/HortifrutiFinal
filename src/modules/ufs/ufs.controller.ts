import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { UfsService } from './ufs.service';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Controller('ufs')
export class UfsController {
  constructor(private readonly ufsService: UfsService) {}

  @Post()
  create(@Body() createUfDto: CreateUfDto) {
    return this.ufsService.create(createUfDto);
  }

  @Get()
  findAll() {
    return this.ufsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Uf = await this.ufsService.findOne(id);
    if (!Uf) throw new NotFoundException();
    return Uf;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto) {
    const Uf = await this.ufsService.update(id, updateUfDto);
    if (!Uf) throw new NotFoundException();
    return Uf;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const Uf = await this.ufsService.remove(id);
    if (!Uf) throw new NotFoundException();
  }
}
