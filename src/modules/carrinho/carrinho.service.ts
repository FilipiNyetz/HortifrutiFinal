import { Injectable } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly repository: Repository<Carrinho>
  ) {}

  create(dto: CreateCarrinhoDto) {
      const Carrinho = this.repository.create(dto);
      return this.repository.save(Carrinho);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({idCarrinho : id});
  }

  async update(id: string, dto: UpdateCarrinhoDto) {
    const Carrinho = await this.repository.findOneBy({idCarrinho : id});
    if (!Carrinho) return null;
    this.repository.merge(Carrinho, dto);
    return this.repository.save(Carrinho);
  }

  async remove(id: string) {
    const Carrinho = await this.repository.findOneBy({idCarrinho : id});
    if (!Carrinho) return null;
    return this.repository.remove(Carrinho);
  }
}
