import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LojaService {
  constructor(@InjectRepository(Loja)
  private readonly repository: Repository<Loja>) { }

  create(createLojaDto: CreateLojaDto) {
    const Loja = this.repository.create(createLojaDto);
    return this.repository.save(Loja);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id_Loja: id });
  }

  async update(id: number, dto: UpdateLojaDto) {
    const loja = await this.repository.findOneBy({ id_Loja: id });
    if (!loja) return null;
    this.repository.merge(loja, dto);
    return this.repository.save(loja);
  }

  async remove(id: number) {
    const loja = await this.repository.findOneBy({ id_Loja: id });
    if (!loja) return null;
    return this.repository.remove(loja);
  }
}
