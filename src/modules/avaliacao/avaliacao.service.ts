import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Avaliacao } from './entities/avaliacao.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Loja } from '../loja/entities/loja.entity';
import { HistoricoCompra } from '../historico-compra/entities/historico-compra.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,

    @InjectRepository(HistoricoCompra)
    private readonly historicoRepository: Repository<HistoricoCompra>,
  ) { }

  async avaliarCompra(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: dto.id_Usuario },
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const historico = await this.historicoRepository.findOne({
      where: { id: dto.id_HistoricoCompra },
      relations: ['carrinho', 'carrinho.itens', 'carrinho.itens.produto', 'carrinho.itens.produto.loja'],
    });
    if (!historico) {
      throw new NotFoundException('Histórico de compra não encontrado');
    }

    const loja = await this.lojaRepository.findOne({
      where: { id_Loja: dto.id_Loja },
    });
    if (!loja) {
      throw new NotFoundException('Loja não encontrada');
    }

    const avaliacao = this.avaliacaoRepository.create({
      comentario: dto.comentario,
      nota: dto.nota,
      usuario,
      loja,
      historicoCompra: historico,
    });

    return this.avaliacaoRepository.save(avaliacao);
  }
}
