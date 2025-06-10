import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from '../cidades/entities/cidade.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly repository: Repository<Endereco>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) { }

  async create(dto: CreateEnderecoDto) {
    // Agora busca por id_Cidade, que é number
    const cidade = await this.cidadeRepository.findOneBy({ id_cidade: dto.id_Cidade });
    if (!cidade) {
      throw new NotFoundException(`Cidade com ID '${dto.id_Cidade}' não encontrada`);
    }

    const endereco = this.repository.create({
      rua: dto.rua,
      cep: dto.cep,
      complemento: dto.complemento,
      cidade,
    });

    return this.repository.save(endereco);
  }

  findAll() {
    return this.repository.find({
      relations: ['cidade'],
    });
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.repository.findOne({
      where: { id_endereco: id },
      relations: ['cidade']
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }
    return endereco;
  }

  async update(id: number, dto: UpdateEnderecoDto) {
    const endereco = await this.findOne(id);

    if (dto.rua !== undefined) endereco.rua = dto.rua;
    if (dto.cep !== undefined) endereco.cep = dto.cep;
    if (dto.complemento !== undefined) endereco.complemento = dto.complemento;

    if (dto.id_Cidade !== undefined) {
      const cidade = await this.cidadeRepository.findOneBy({ id_cidade: dto.id_Cidade });
      if (!cidade) throw new NotFoundException(`Cidade com ID '${dto.id_Cidade}' não encontrada`);
      endereco.cidade = cidade;
    }

    return this.repository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.repository.remove(endereco);
  }
}
