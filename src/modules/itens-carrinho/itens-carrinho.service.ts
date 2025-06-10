import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCarrinho } from './entities/itens-carrinho.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';
import { Produto } from '../produto/entities/produto.entity';
import { CreateItensCarrinhoDto } from './dto/create-itens-carrinho.dto';

@Injectable()
export class ItensCarrinhoService {
  constructor(
    @InjectRepository(ItemCarrinho)
    private readonly itensCarrinhoRepository: Repository<ItemCarrinho>,

    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) { }

  async create(dto: CreateItensCarrinhoDto): Promise<ItemCarrinho> {
    const carrinho = await this.carrinhoRepository.findOne({ where: { id_Carrinho: dto.id_Carrinho } });
    if (!carrinho) throw new NotFoundException('Carrinho não encontrado');

    const produto = await this.produtoRepository.findOne({ where: { id: dto.produtoId } });
    if (!produto) throw new NotFoundException('Produto não encontrado');

    const item = this.itensCarrinhoRepository.create({
      carrinho,
      produto,
      quantidade: dto.quantidade,
      precoUnitario: produto.valor,
    });

    await this.itensCarrinhoRepository.save(item);

    // Atualiza valor total e quantidade do carrinho
    carrinho.valorTotal = (carrinho.valorTotal || 0) + produto.valor * dto.quantidade;
    carrinho.quantidade = (carrinho.quantidade || 0) + dto.quantidade;
    await this.carrinhoRepository.save(carrinho);

    return item;
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
