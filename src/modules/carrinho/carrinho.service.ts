import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { Estoque } from '../estoque/entities/estoque.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {}

  async create(dto: CreateCarrinhoDto) {
    if (dto.idProduto) {
      const produto = await this.produtoRepository.findOne({ 
        where: { id: dto.idProduto } 
      });
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${dto.idProduto} não encontrado`);
      }
    }

    const carrinho = this.carrinhoRepository.create({
      valorTotal: dto.valorTotal || 0,
      quantidade: dto.quantidade || 0,
    });

    if (dto.idProduto) {
      const produto = await this.produtoRepository.findOne({ 
        where: { id: dto.idProduto } 
      });
      if (produto) {
        carrinho.produtos = [produto];
      }
    }

    return this.carrinhoRepository.save(carrinho);
  }

  findAll() {
    return this.carrinhoRepository.find({ relations: ['produtos'] });
  }

  findOne(id: number) {
    return this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
  }

  async update(id: number, dto: UpdateCarrinhoDto) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
    
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    if (dto.valorTotal !== undefined && dto.valorTotal !== null) {
      carrinho.valorTotal = dto.valorTotal;
    }
    if (dto.quantidade !== undefined && dto.quantidade !== null) {
      carrinho.quantidade = dto.quantidade;
    }

    return this.carrinhoRepository.save(carrinho);
  }

  async remove(id: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
    
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    for (const produto of carrinho.produtos) {
      produto.carrinho = null;
      await this.produtoRepository.save(produto);
    }

    return this.carrinhoRepository.remove(carrinho);
  }

  async addProduto(carrinhoId: number, produtoId: number, quantidade: number = 1) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['produtos'],
    });
    
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
      relations: ['loja'],
    });

    if (!carrinho || !produto) {
      throw new NotFoundException('Carrinho ou Produto não encontrado');
    }

    // Verifica se o produto já está no carrinho
    const produtoNoCarrinho = carrinho.produtos.find(p => p.id === produtoId);
    if (produtoNoCarrinho) {
      throw new NotFoundException('Produto já está no carrinho');
    }

    // Consulta estoque para o produto na loja correspondente
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

    // Atualiza estoque
    estoque.quantidade -= quantidade;
    await this.estoqueRepository.save(estoque);

    // Adiciona o produto ao carrinho
    carrinho.produtos.push(produto);
    produto.carrinho = carrinho;

    // Atualiza valor total e quantidade do carrinho
    carrinho.valorTotal = carrinho.produtos.reduce((total, p) => total + (p.valor * quantidade), 0);
    carrinho.quantidade += quantidade;

    await this.produtoRepository.save(produto);
    return this.carrinhoRepository.save(carrinho);
  }

  async removeProduto(carrinhoId: number, produtoId: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['produtos'],
    });
    
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const produtoIndex = carrinho.produtos.findIndex(p => p.id === produtoId);
    if (produtoIndex === -1) {
      throw new NotFoundException('Produto não encontrado no carrinho');
    }

    const [produtoRemovido] = carrinho.produtos.splice(produtoIndex, 1);
    const quantidadeRemovida = 1; // valor fixo, ajustar se necessário

    // Atualiza estoque devolvendo a quantidade
    const estoqueRemovido = await this.estoqueRepository.findOne({
      where: {
        produto: { id: produtoRemovido.id },
        loja: { id_Loja: produtoRemovido.loja.id_Loja },
      },
      relations: ['produto', 'loja'],
    });

    if (estoqueRemovido) {
      estoqueRemovido.quantidade += quantidadeRemovida;
      await this.estoqueRepository.save(estoqueRemovido);
    }

    produtoRemovido.carrinho = null;

    // Atualiza valor total e quantidade do carrinho
    carrinho.valorTotal = carrinho.produtos.reduce((total, p) => total + p.valor, 0);
    carrinho.quantidade -= quantidadeRemovida;

    await this.produtoRepository.save(produtoRemovido);
    return this.carrinhoRepository.save(carrinho);
  }

  async calcularTotal(carrinhoId: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['produtos'],
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    carrinho.valorTotal = carrinho.produtos.reduce((total, p) => total + p.valor, 0);
    return this.carrinhoRepository.save(carrinho);
  }
}
