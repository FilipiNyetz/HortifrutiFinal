import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from './entities/estoque.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Produto } from 'src/modules/produto/entities/produto.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private estoqueRepository: Repository<Estoque>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
  ) {}

  async create(createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    const { quantidade, produtoId, lojaId } = createEstoqueDto;

    // Buscar Produto
    const produto = await this.produtoRepository.findOne({ where: { id: produtoId } });
    if (!produto) {
      throw new NotFoundException(`Produto com id ${produtoId} não encontrado`);
    }

    // Buscar Loja
    const loja = await this.lojaRepository.findOne({ where: { id_Loja: lojaId } });
    if (!loja) {
      throw new NotFoundException(`Loja com id ${lojaId} não encontrado`);
    }

    const estoque = this.estoqueRepository.create({
      quantidade,
      produto,
      loja,
    });

    return this.estoqueRepository.save(estoque);
  }

  findAll(): Promise<Estoque[]> {
    return this.estoqueRepository.find();
  }

  async findOne(id: number): Promise<Estoque> {
    const estoque = await this.estoqueRepository.findOne({ where: { id_estoque: id } });
    if (!estoque) {
      throw new NotFoundException(`Estoque com id ${id} não encontrado`);
    }
    return estoque;
  }

  async update(id: number, updateEstoqueDto: UpdateEstoqueDto): Promise<Estoque> {
    const estoque = await this.findOne(id);

    if (updateEstoqueDto.quantidade !== undefined) {
      estoque.quantidade = updateEstoqueDto.quantidade;
    }

    if (updateEstoqueDto.produtoId) {
      const produto = await this.produtoRepository.findOne({ where: { id: updateEstoqueDto.produtoId } });
      if (!produto) throw new NotFoundException(`Produto com id ${updateEstoqueDto.produtoId} não encontrado`);
      estoque.produto = produto;
    }

    if (updateEstoqueDto.lojaId) {
      const loja = await this.lojaRepository.findOne({ where: { id_Loja: updateEstoqueDto.lojaId } });
      if (!loja) throw new NotFoundException(`Loja com id ${updateEstoqueDto.lojaId} não encontrado`);
      estoque.loja = loja;
    }

    return this.estoqueRepository.save(estoque);
  }

  async remove(id: number): Promise<void> {
    const estoque = await this.findOne(id);
    await this.estoqueRepository.remove(estoque);
  }
}
  