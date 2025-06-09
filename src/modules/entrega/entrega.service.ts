import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Entrega } from './entities/entrega.entity';
import { Carrinho } from '../carrinho/entities/carrinho.entity';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
    @InjectRepository(Entrega)
    private entregaRepository: Repository<Entrega>,
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>,
  ) {}

  async create(dto: CreateEntregaDto): Promise<Entrega> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: dto.id_usuario });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const endereco = await this.enderecoRepository.findOneBy({ id_endereco: dto.id_endereco });
    if (!endereco) throw new NotFoundException('Endereço não encontrado');

    const carrinho = await this.carrinhoRepository.findOneBy({ id_Carrinho: dto.id_carrinho });
    if (!carrinho) throw new NotFoundException('Carrinho não encontrado');

    const entrega = this.entregaRepository.create({
      dataPedido: new Date(dto.dataPedido),
      dataEntrega: new Date(dto.dataEntrega),
      status: dto.status,
      usuario,
      endereco,
      carrinho,
    });

    return this.entregaRepository.save(entrega);
  }

  findAll() {
    return this.entregaRepository.find();
  }

  findOne(id: number) {
    return this.entregaRepository.findOneBy({ id_entrega: id });
  }

  async update(id: number, dto: UpdateEntregaDto) {
    const entrega = await this.entregaRepository.findOneBy({ id_entrega: id });
    if (!entrega) throw new NotFoundException('Entrega não encontrada');

    this.entregaRepository.merge(entrega, dto);
    return this.entregaRepository.save(entrega);
  }

  async remove(id: number) {
    const entrega = await this.entregaRepository.findOneBy({ id_entrega: id });
    if (!entrega) throw new NotFoundException('Entrega não encontrada');
    return this.entregaRepository.remove(entrega);
  }
}
