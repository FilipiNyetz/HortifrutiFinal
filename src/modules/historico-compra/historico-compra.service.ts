import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HistoricoCompra, CompraStatus } from './entities/historico-compra.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';
import { MetodoPagamento } from '../metodo-pagamento/entities/metodo-pagamento.entity';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';

@Injectable()
export class HistoricoCompraService {
  constructor(
    @InjectRepository(HistoricoCompra)
    private readonly historicoCompraRepository: Repository<HistoricoCompra>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,

    @InjectRepository(MetodoPagamento)
    private readonly metodoPagamentoRepository: Repository<MetodoPagamento>,
  ) { }

  async pagar(dto: CreateHistoricoCompraDto): Promise<HistoricoCompra> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: dto.usuarioId } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const carrinho = await this.carrinhoRepository.findOne({ where: { id_Carrinho: dto.carrinhoId } });
    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const metodoPagamento = await this.metodoPagamentoRepository.findOne({
      where: { usuario: { id_usuario: dto.usuarioId } },
    });
    if (!metodoPagamento) {
      throw new NotFoundException('Método de pagamento do usuário não encontrado');
    }

    const novaCompra = this.historicoCompraRepository.create({
      usuario,
      carrinho,
      valorTotal: carrinho.valorTotal,
      status: dto.status || CompraStatus.PENDING,
      metodoPagamento,
      dataCompra: dto.dataPagamento ? new Date(dto.dataPagamento) : new Date(),
    });

    return this.historicoCompraRepository.save(novaCompra);
  }
}
