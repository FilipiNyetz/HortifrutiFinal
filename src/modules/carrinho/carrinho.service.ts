import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { Carrinho } from './entities/carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../produto/entities/produto.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  // Cria um carrinho vazio
  async create(dto: CreateCarrinhoDto) {
    // Verifica se o produto existe se idProduto foi fornecido
    if (dto.idProduto) {
      const produto = await this.produtoRepository.findOne({ 
        where: { id: dto.idProduto } 
      });
      
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${dto.idProduto} não encontrado`);
      }
    }

    // Cria o carrinho com os dados validados
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

  // Lista todos os carrinhos com seus produtos
  findAll() {
    return this.carrinhoRepository.find({ 
      relations: ['produtos'],
    });
  }

  // Busca um carrinho específico com seus produtos
  findOne(id: number) {
    return this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
  }

  // Atualiza informações do carrinho
  async update(id: number, dto: UpdateCarrinhoDto) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
    
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    // Atualiza apenas os campos fornecidos
    if (dto.valorTotal !== undefined && dto.valorTotal !== null) {
      carrinho.valorTotal = dto.valorTotal;
    }
    if (dto.quantidade !== undefined && dto.quantidade !== null) {
      carrinho.quantidade = dto.quantidade;
    }

    return this.carrinhoRepository.save(carrinho);
  }

  // Remove um carrinho
  async remove(id: number) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: id },
      relations: ['produtos'],
    });
    
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    // Remove a associação dos produtos primeiro
    for (const produto of carrinho.produtos) {
      produto.carrinho = null;
      await this.produtoRepository.save(produto);
    }

    return this.carrinhoRepository.remove(carrinho);
  }

  // Adiciona um produto ao carrinho
  async addProduto(carrinhoId: number, produtoId: number, quantidade: number = 1) {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id_Carrinho: carrinhoId },
      relations: ['produtos'],
    });
    
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
    });

    if (!carrinho || !produto) {
      throw new NotFoundException('Carrinho ou Produto não encontrado');
    }

    // Verifica se o produto já está no carrinho
    const produtoNoCarrinho = carrinho.produtos.find(p => p.id === produtoId);
    if (produtoNoCarrinho) {
      throw new NotFoundException('Produto já está no carrinho');
    }

    // Verifica estoque
    if (produto.quantidade < quantidade) {
      throw new NotFoundException('Quantidade indisponível em estoque');
    }

    // Adiciona o produto ao carrinho
    carrinho.produtos.push(produto);
    produto.carrinho = carrinho;
    produto.quantidade -= quantidade;

    // Atualiza o valor total e quantidade do carrinho
    carrinho.valorTotal = carrinho.produtos.reduce((total, p) => total + (p.valor * quantidade), 0);
    carrinho.quantidade += quantidade;

    await this.produtoRepository.save(produto);
    return this.carrinhoRepository.save(carrinho);
  }

  // Remove um produto do carrinho
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
    const quantidadeRemovida = 1; // Ou poderia ser um valor dinâmico

    // Devolve ao estoque
    produtoRemovido.carrinho = null;
    produtoRemovido.quantidade += quantidadeRemovida;

    // Atualiza o valor total e quantidade do carrinho
    carrinho.valorTotal = carrinho.produtos.reduce((total, p) => total + p.valor, 0);
    carrinho.quantidade -= quantidadeRemovida;

    await this.produtoRepository.save(produtoRemovido);
    return this.carrinhoRepository.save(carrinho);
  }

  // Calcula o valor total do carrinho
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