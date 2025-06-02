import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,

    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  async create(createLojaDto: CreateLojaDto) {
    const { id_Endereco, ...dadosLoja } = createLojaDto;

    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id_Endereco} não encontrado`);
    }

    const loja = this.lojaRepository.create({
      ...dadosLoja,
      endereco,
    });

    return this.lojaRepository.save(loja);
  }

  findAll() {
    return this.lojaRepository.find({ relations: ['endereco'] });
  }

  async findOne(id: number) {
    const loja = await this.lojaRepository.findOne({
      where: { id_Loja: id },
      relations: ['endereco'],
    });

    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }

    return loja;
  }

  async update(id: number, dto: UpdateLojaDto) {
    const loja = await this.lojaRepository.findOneBy({ id_Loja: id });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }

    this.lojaRepository.merge(loja, dto);
    return this.lojaRepository.save(loja);
  }

  async remove(id: number) {
    const loja = await this.lojaRepository.findOneBy({ id_Loja: id });
    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }

    return this.lojaRepository.remove(loja);
  }
}
