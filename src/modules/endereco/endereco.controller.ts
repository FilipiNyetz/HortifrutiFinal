import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = Number(id);
    const Endereco = await this.enderecoService.findOne(numericId);
    if (!Endereco) throw new NotFoundException();
    return Endereco;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    const numericId = Number(id);
    const Endereco = await this.enderecoService.update(numericId, updateEnderecoDto);
    if (!Endereco) throw new NotFoundException();
    return Endereco;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const numericId = Number(id);
    await this.enderecoService.remove(numericId);
  }
}
