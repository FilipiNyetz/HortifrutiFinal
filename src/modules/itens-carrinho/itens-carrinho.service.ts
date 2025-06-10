import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCarrinho } from './entities/itens-carrinho.entity';

@Injectable()
export class ItensCarrinhoService {
  constructor(
    @InjectRepository(ItemCarrinho)
    private readonly itensCarrinhoRepository: Repository<ItemCarrinho>,
  ) { }

  async create(data: Partial<ItemCarrinho>): Promise<ItemCarrinho> {
    const item = this.itensCarrinhoRepository.create(data);
    return this.itensCarrinhoRepository.save(item);
  }

  findAll(): Promise<ItemCarrinho[]> {
    return this.itensCarrinhoRepository.find({ relations: ['produto', 'carrinho'] });
  }

  async findOne(id: number): Promise<ItemCarrinho> {
    const item = await this.itensCarrinhoRepository.findOne({
      where: { id },
      relations: ['produto', 'carrinho'],
    });
    if (!item) {
      throw new NotFoundException(`Item do carrinho com ID ${id} não encontrado`);
    }
    return item;
  }

  async update(id: number, data: Partial<ItemCarrinho>): Promise<ItemCarrinho> {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.itensCarrinhoRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itensCarrinhoRepository.remove(item);
  }
}
