import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaService {

  constructor( @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria> ) {}

  create(dto: CreateCategoriaDto) {
    const Categoria = this.repository.create(dto);
    return this.repository.save(Categoria);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id_categoria : id});
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const Categoria = await this.repository.findOneBy({id_categoria : id});
    if (!Categoria) return null;
    this.repository.merge(Categoria, dto);
    return this.repository.save(Categoria);
  }

  async remove(id: number) {
    const Categoria = await this.repository.findOneBy({id_categoria : id});
    if (!Categoria) return null;
    return this.repository.remove(Categoria);
  }
}
