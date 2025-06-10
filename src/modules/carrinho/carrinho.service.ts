import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';
import { ItemCarrinho } from '../itens-carrinho/entities/itens-carrinho.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Estoque } from '../estoque/entities/estoque.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(ItemCarrinho)
    private readonly itemCarrinhoRepository: Repository<ItemCarrinho>,

    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) { }

  async create(dto: CreateCarrinhoDto) {
    const carrinho = this.carrinhoRepository.create({
      valorTotal: 0,
      quantidade: 0,
      itens: [],
    });
    return this.carrinhoRepository.save(carrinho);
  }

  findAll() {
    return this.carrinhoRepository.find({ relations: ['itens', 'itens.produto'] });
  }

  findOne(id: number) {
    return this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['itens', 'itens.produto'],
    });
  }

  async update(id: number, dto: UpdateCarrinhoDto) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
    });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    if (dto.valorTotal !== undefined) {
      carrinho.valorTotal = dto.valorTotal ?? 0;
    }
    if (dto.quantidade !== undefined) {
      carrinho.quantidade = dto.quantidade ?? 0;
    }

    return this.carrinhoRepository.save(carrinho);
  }

  async remove(id: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['itens'],
    });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    // Ao remover o carrinho, os itens em cascade serão removidos também
    return this.carrinhoRepository.remove(carrinho);
  }

  async addProduto(carrinhoId: number, produtoId: number, quantidade: number = 1) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['itens', 'itens.produto'],
    });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
      relations: ['loja'],
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Verifica estoque
    const estoque = await this.estoqueRepository.findOne({
      where: {
        produto: { id: produtoId },
        loja: { id_Loja: produto.loja.id_Loja },
      },
      relations: ['produto', 'loja'],
    });

    if (!estoque || estoque.quantidade < quantidade) {
      throw new NotFoundException('Quantidade indisponível em estoque');
    }

    // Verifica se produto já está no carrinho
    let item = carrinho.itens.find(i => i.produto.id === produtoId);
    if (item) {
      // Atualiza quantidade do item no carrinho
      item.quantidade += quantidade;
    } else {
      // Cria novo item
      item = this.itemCarrinhoRepository.create({
        carrinho,
        produto,
        quantidade,
      });
      carrinho.itens.push(item);
    }

    // Atualiza estoque
    estoque.quantidade -= quantidade;
    await this.estoqueRepository.save(estoque);

    // Recalcula total e quantidade
    await this.itemCarrinhoRepository.save(item);
    await this.recalcularCarrinho(carrinho);

    return this.carrinhoRepository.save(carrinho);
  }

  async removeProduto(carrinhoId: number, produtoId: number, quantidade: number = 1) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['itens', 'itens.produto', 'itens.produto.loja'],
    });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const item = carrinho.itens.find(i => i.produto.id === produtoId);
    if (!item) {
      throw new NotFoundException('Produto não encontrado no carrinho');
    }

    if (quantidade >= item.quantidade) {
      // Remove o item inteiro
      carrinho.itens = carrinho.itens.filter(i => i.produto.id !== produtoId);
      await this.itemCarrinhoRepository.remove(item);
    } else {
      // Decrementa a quantidade
      item.quantidade -= quantidade;
      await this.itemCarrinhoRepository.save(item);
    }

    // Atualiza estoque devolvendo a quantidade removida
    const estoque = await this.estoqueRepository.findOne({
      where: {
        produto: { id: produtoId },
        loja: { id_Loja: item.produto.loja.id_Loja },
      },
      relations: ['produto', 'loja'],
    });
    if (estoque) {
      estoque.quantidade += quantidade;
      await this.estoqueRepository.save(estoque);
    }

    // Recalcula total e quantidade do carrinho
    await this.recalcularCarrinho(carrinho);

    return this.carrinhoRepository.save(carrinho);
  }

  private async recalcularCarrinho(carrinho: Carrinho) {
    // Recarrega os itens para garantir dados atualizados
    const itens = await this.itemCarrinhoRepository.find({
      where: { carrinho: { id_Carrinho: carrinho.id_Carrinho } },
      relations: ['produto'],
    });

    const valorTotal = itens.reduce(
      (total, item) => total + item.produto.valor * item.quantidade,
      0,
    );
    const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);

    carrinho.valorTotal = valorTotal;
    carrinho.quantidade = quantidadeTotal;

    carrinho.itens = itens;

    await this.carrinhoRepository.save(carrinho);
  }
}
