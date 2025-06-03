 
 
 
 import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cidade } from '../cidades/entities/cidade.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly repository: Repository<Endereco>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  async create(dto: CreateEnderecoDto) {
    const cidade = await this.cidadeRepository.findOneBy({ nomeCidade: dto.nomeCidade });
    if (!cidade) {
      throw new NotFoundException(`Cidade '${dto.nomeCidade}' não encontrada`);
    }

    const usuario = await this.usuarioRepository.findOneBy({ username: dto.nomeUsuario });
    if (!usuario) {
      throw new NotFoundException(`Usuário '${dto.nomeUsuario}' não encontrado`);
    }

    const endereco = this.repository.create({
      rua: dto.rua,
      cep: dto.cep,
      complemento: dto.complemento,
      cidade,
      usuario,
    });

    return this.repository.save(endereco);
  }

  findAll() {
    return this.repository.find({
      relations: ['cidade', 'usuario'],
    });
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.repository.findOne({ 
      where: { id_endereco: id },
      relations: ['cidade', 'usuario']
    });
    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }
    return endereco;
  }

  async update(id: number, dto: UpdateEnderecoDto) {
    const endereco = await this.findOne(id); // Reutiliza a busca com tratamento de erro

    // Atualiza apenas os campos fornecidos
    if (dto.rua !== undefined) endereco.rua = dto.rua;
    if (dto.cep !== undefined) endereco.cep = dto.cep;
    if (dto.complemento !== undefined) endereco.complemento = dto.complemento;
    
    if (dto.nomeCidade !== undefined) {
      const cidade = await this.cidadeRepository.findOneBy({ nomeCidade: dto.nomeCidade });
      if (!cidade) throw new NotFoundException(`Cidade '${dto.nomeCidade}' não encontrada`);
      endereco.cidade = cidade;
    }

    return this.repository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.repository.remove(endereco);
  }
}

