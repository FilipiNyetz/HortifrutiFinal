import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';
import { MetodoPagamento } from './entities/metodo-pagamento.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class MetodoPagamentoService {
  constructor(
    @InjectRepository(MetodoPagamento)
    private readonly repository: Repository<MetodoPagamento>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateMetodoPagamentoDto): Promise<MetodoPagamento> {
    // Busca o usuário pelo id
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: dto.id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${dto.id_usuario} não encontrado.`);
    }

    // Cria o método e associa o usuário
    const metodoPagamento = this.repository.create({
      ...dto,
      usuario,
    });

    return this.repository.save(metodoPagamento);
  }

  async findAll(): Promise<MetodoPagamento[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<MetodoPagamento> {
    const metodo = await this.repository.findOneBy({ id });
    if (!metodo) {
      throw new NotFoundException(`Método de pagamento com id ${id} não encontrado.`);
    }
    return metodo;
  }

  async update(id: number, dto: UpdateMetodoPagamentoDto): Promise<MetodoPagamento> {
    await this.repository.update(id, dto);
    return this.findOne(id); // já lança erro se não encontrar
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Método de pagamento com id ${id} não encontrado.`);
    }
  }
}
