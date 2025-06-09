import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { Repository } from 'typeorm';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ) { }

  async create(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: dto.id_Usuario } });
    const loja = await this.lojaRepository.findOne({ where: { id_Loja: dto.id_Loja } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }

    const avaliacao = this.avaliacaoRepository.create({
      comentario: dto.comentario,
      nota: dto.nota,
      usuario,
      loja,
    });

    return await this.avaliacaoRepository.save(avaliacao);
  }

  async findAll(): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({
      relations: ['usuario', 'loja'],
    });
  }

  async findByLoja(lojaId: number): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find({
      where: { loja: { id_Loja: lojaId } },
      relations: ['usuario'],
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const avaliacao = await this.avaliacaoRepository.findOne({ where: { id_Avaliacao: id } });

    if (!avaliacao) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    await this.avaliacaoRepository.remove(avaliacao);
    return { message: 'Avaliação removida com sucesso' };
  }
}
