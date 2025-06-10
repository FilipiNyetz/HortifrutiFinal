import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loja } from './entities/loja.entity';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: createLojaDto.usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário lojista não encontrado');
    }

    if (usuario.role !== 'LOJISTA') {
      throw new BadRequestException('Usuário não possui permissão para criar loja');
    }

    const loja = this.lojaRepository.create({
      nome: createLojaDto.nome,
      telefone: createLojaDto.telefone,
      dados_bancarios: createLojaDto.dados_bancarios,
      usuario, // relaciona o usuário lojista
    });

    return this.lojaRepository.save(loja);
  }

  findAll(): Promise<Loja[]> {
    return this.lojaRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Loja> {
    const loja = await this.lojaRepository.findOne({
      where: { id_Loja: id },
      relations: ['usuario'],
    });

    if (!loja) {
      throw new NotFoundException(`Loja com id ${id} não encontrada`);
    }

    return loja;
  }

  async update(id: number, updateLojaDto: UpdateLojaDto): Promise<Loja> {
    const loja = await this.findOne(id);

    if (updateLojaDto.nome !== undefined) loja.nome = updateLojaDto.nome;
    if (updateLojaDto.telefone !== undefined) loja.telefone = updateLojaDto.telefone;
    if (updateLojaDto.dados_bancarios !== undefined) loja.dados_bancarios = updateLojaDto.dados_bancarios;

    if (updateLojaDto.usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: updateLojaDto.usuarioId },
      });

      if (!usuario) {
        throw new NotFoundException('Usuário lojista não encontrado');
      }

      if (usuario.role !== 'LOJISTA') {
        throw new BadRequestException('Usuário não possui permissão para ser lojista');
      }

      loja.usuario = usuario;
    }

    return this.lojaRepository.save(loja);
  }

  async remove(id: number): Promise<void> {
    const loja = await this.findOne(id);
    await this.lojaRepository.remove(loja);
  }
}
