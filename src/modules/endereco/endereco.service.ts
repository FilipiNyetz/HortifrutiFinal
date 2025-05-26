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
    const { CEP, numero, id_Cidade } = createEnderecoDto;

    const cidade = await this.cidadeRepository.findOneBy({ id_cidade: createEnderecoDto.id_Cidade });

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


  findAll() {
    return this.enderecoRepository.find();
  }

  async findOne(id: number) {
    const enedereco = await this.enderecoRepository.findOneBy({ id_Endereco:id });

    if (!enedereco) {
      throw new NotFoundException(`Endereco com ID ${id} não encontrado`);
    }

    return enedereco;
  }

  async update(id: number, updatePagamentoDto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco:id });

    if (!endereco) {
      throw new NotFoundException(`Endereco com ID ${id} não encontrado`);
    }

  
    this.enderecoRepository.merge(endereco, updatePagamentoDto);


    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number) {
    const endereco = await this.enderecoRepository.findOneBy({ id_Endereco:id });

    if (!endereco) {
      throw new NotFoundException(`Endereco com ID ${id} não encontrado`);
    }


    await this.enderecoRepository.delete(id);
  }
}

