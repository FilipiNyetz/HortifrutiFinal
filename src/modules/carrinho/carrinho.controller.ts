import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) { }

  @Post()
  create(@Body() createCarrinhoDto: CreateCarrinhoDto) {
    return this.carrinhoService.create(createCarrinhoDto);
  }

  // Nova rota para adicionar produto
  @Post(':id/add-produto/:produtoId')
  addProduto(
    @Param('id') carrinhoId: number,
    @Param('produtoId') produtoId: number,
    @Body('quantidade') quantidade: number = 1
  ) {
    return this.carrinhoService.addProduto(carrinhoId, produtoId, quantidade);
  }

  @Get()
  findAll() {
    return this.carrinhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carrinhoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarrinhoDto: UpdateCarrinhoDto) {
    return this.carrinhoService.update(id, updateCarrinhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carrinhoService.remove(id);
  }
}