import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class ProdutoService {
  repository: any;
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ) { }


  async create(dto: CreateProdutoDto) {
    const Loja = await this.lojaRepository.findOneBy({ id_Loja: dto.id_loja });

    if (!Loja) {
      throw new NotFoundException(`UF com sigla '${dto.id_loja}' não encontrada`);
    }


    const Produto = this.produtoRepository.create(dto)
    return this.produtoRepository.save(Produto);
  }
  async findAll(id_Loja: number) {
    return this.produtoRepository.find({
      where: { loja: { id_Loja: id_Loja } },
      relations: ['loja'],
    });
  }


  findOne(id: number) {
    return this.produtoRepository.findOneBy({ id: id });
  }

  async update(id: number, dto: UpdateProdutoDto) {
    const Produto = await this.produtoRepository.findOneBy({ id: id });
    if (!Produto) return null;
    this.repository.merge(Produto, dto);
    return this.repository.save(Produto);
  }

  async remove(id: number) {
    const Produto = await this.produtoRepository.findOneBy({ id: id });
    if (!Produto) return null;
    return this.repository.remove(Produto);
  }
}
