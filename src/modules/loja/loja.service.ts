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

  async create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const { id_Endereco, ...dadosLoja } = createLojaDto;

    // Converter para número e validar
    const idEndereco = Number(id_Endereco);
    if (isNaN(idEndereco)) {
      throw new NotFoundException('ID do endereço deve ser um número válido');
    }

    const endereco = await this.enderecoRepository.findOneBy({ 
      id_endereco: idEndereco 
    });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${idEndereco} não encontrado`);
    }

    const loja = this.lojaRepository.create({
      ...dadosLoja,
      endereco,
    });

    return this.lojaRepository.save(loja);
  }

  async findAll(): Promise<Loja[]> {
    return this.lojaRepository.find({ 
      relations: ['endereco'],
      order: { id_Loja: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Loja> {
    const loja = await this.lojaRepository.findOne({
      where: { id_Loja: id },
      relations: ['endereco'],
    });

    if (!loja) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }

    return loja;
  }

  async update(id: number, dto: UpdateLojaDto): Promise<Loja> {
    const loja = await this.findOne(id); // Reutiliza o findOne que já inclui validação
    
    if (dto.id_Endereco) {
      const idEndereco = Number(dto.id_Endereco);
      const endereco = await this.enderecoRepository.findOneBy({ 
        id_endereco: idEndereco 
      });

      if (!endereco) {
        throw new NotFoundException(`Endereço com ID ${idEndereco} não encontrado`);
      }
      loja.endereco = endereco;
    }

    this.lojaRepository.merge(loja, dto);
    return this.lojaRepository.save(loja);
  }

  async remove(id: number): Promise<void> {
    const result = await this.lojaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }
  }
}