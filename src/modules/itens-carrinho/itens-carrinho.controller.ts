import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { ItemCarrinho } from './entities/itens-carrinho.entity';

@Controller('itens-carrinho')
export class ItensCarrinhoController {
  constructor(private readonly itensCarrinhoService: ItensCarrinhoService) { }

  @Post()
  create(@Body() data: Partial<ItemCarrinho>) {
    return this.itensCarrinhoService.create(data);
  }

  @Get()
  findAll() {
    return this.itensCarrinhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensCarrinhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<ItemCarrinho>) {
    return this.itensCarrinhoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensCarrinhoService.remove(+id);
  }
}
