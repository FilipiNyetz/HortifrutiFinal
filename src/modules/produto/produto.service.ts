import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { Loja } from '../loja/entities/loja.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateProdutoDto) {
    const loja = await this.lojaRepository.findOneBy({ id_Loja: dto.id_loja });
    if (!loja) {
      throw new NotFoundException(`Loja com ID '${dto.id_loja}' não encontrada`);
    }

    const categoria = await this.categoriaRepository.findOneBy({ id_categoria: dto.id_categoria });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${dto.id_categoria}' não encontrada`);
    }

    const produto = this.produtoRepository.create({
      ...dto,
      loja: loja,
      categoria: categoria,
    });

    return this.produtoRepository.save(produto);
  }

  async findAll(id_Loja: number) {
    return this.produtoRepository.find({
      where: { loja: { id_Loja: id_Loja } },
      relations: ['loja', 'categoria'],
    });
  }

  async findOne(id: number) {
    return this.produtoRepository.findOne({
      where: { id },
      relations: ['loja', 'categoria'],
    });
  }

  async update(id: number, dto: UpdateProdutoDto) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) return null;

    if (dto.id_categoria) {
      const categoria = await this.categoriaRepository.findOneBy({ id_categoria: dto.id_categoria });
      if (!categoria) {
        throw new NotFoundException(`Categoria com ID '${dto.id_categoria}' não encontrada`);
      }
      produto.categoria = categoria;
    }

    const produtoAtualizado = this.produtoRepository.merge(produto, dto);
    return this.produtoRepository.save(produtoAtualizado);
  }

  async remove(id: number) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (!produto) return null;

    return this.produtoRepository.remove(produto);
  }
}
