import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Cidade } from '../cidades/entities/cidade.entity';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnderecoService {

  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) { }

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const { CEP, numero, id_cidade } = createEnderecoDto;

    const cidade = await this.cidadeRepository.findOneBy({ id_cidade: id_cidade });

    if (!cidade) {
      throw new NotFoundException('Cidade não encontrada');
    }

    const endereco = this.enderecoRepository.create({
      CEP,
      numero,
      cidade,
    });

    return await this.enderecoRepository.save(endereco);
  }

  async findAll(): Promise<Endereco[]> {
    return this.enderecoRepository.find();
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco: id });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    return endereco;
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco: id });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    // Se enviou novo id_Cidade, atualiza o relacionamento
    if (updateEnderecoDto.id_cidade) {
      const cidade = await this.cidadeRepository.findOneBy({ id_cidade: updateEnderecoDto.id_cidade });
      if (!cidade) {
        throw new NotFoundException('Cidade não encontrada para atualizar');
      }
      endereco.cidade = cidade;
    }

    // Atualiza os demais campos
    this.enderecoRepository.merge(endereco, updateEnderecoDto);

    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco: id });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    await this.enderecoRepository.delete(id);
  }
}
