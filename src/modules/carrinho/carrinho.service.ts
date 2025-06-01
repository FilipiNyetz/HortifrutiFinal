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
  ) { }

  create(dto: CreateCarrinhoDto) {
    const Carrinho = this.repository.create(dto);
    return this.repository.save(Carrinho);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id_Carrinho: id });
  }

  async update(id: number, dto: UpdateCarrinhoDto) {
    const Carrinho = await this.repository.findOneBy({ id_Carrinho: id });
    if (!Carrinho) return null;
    this.repository.merge(Carrinho, dto);
    return this.repository.save(Carrinho);
  }

  async remove(id: number) {
    const Carrinho = await this.repository.findOneBy({ id_Carrinho: id });
    if (!Carrinho) return null;
    return this.repository.remove(Carrinho);
  }
}
