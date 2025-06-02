import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Cidade } from './entities/cidade.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Uf } from '../ufs/entities/uf.entity'
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CidadesService {

  constructor( 
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>,
  
    @InjectRepository(Uf)
    private readonly ufRepository: Repository<Uf>,
  ) {}

  async create(dto: CreateCidadeDto) {
    const uf = await this.ufRepository.findOneBy({ sigla: dto.ufSigla });

    if (!uf) {
      throw new NotFoundException(`UF com sigla '${dto.ufSigla}' não encontrada`);
    }

    const cidade = this.repository.create({
      nomeCidade: dto.nomeCidade,
      uf: uf,
    });

    return this.repository.save(cidade);
  }

  findAll() {
    return this.repository.find();
  }

findOne(id: string) {
  return this.repository.findOneBy({ id_cidade: id });
}

async update(id: string, dto: UpdateCidadeDto) {
  const cidade = await this.repository.findOneBy({ id_cidade: id });
  if (!cidade) return null;
  this.repository.merge(cidade, dto);
  return this.repository.save(cidade);
}

async remove(id: string) {
  const cidade = await this.repository.findOneBy({ id_cidade: id });
  if (!cidade) return null;
  return this.repository.remove(cidade);
}

}

