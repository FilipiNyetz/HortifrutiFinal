import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  async create(createCompraDto: CreateCompraDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: createCompraDto.id_usuario }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${createCompraDto.id_usuario} não encontrado`);
    }

    const novaCompra = this.compraRepository.create({
      usuario
    });

    return this.compraRepository.save(novaCompra);
  }

  async findAll() {
    return this.compraRepository.find({
      relations: ['usuario'],
      order: { id_compra: 'DESC' }
    });
  }

  async findOne(id: number) {
    const compra = await this.compraRepository.findOne({
      where: { id_compra: id },
      relations: ['usuario']
    });

    if (!compra) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }

    return compra;
  }

  async findByUsuario(idUsuario: number) {
    return this.compraRepository.find({
      where: { usuario: { id_usuario: idUsuario } },
      relations: ['usuario'],
      order: { id_compra: 'DESC' }
    });
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    const compra = await this.findOne(id); // Reutiliza a busca que já inclui validação
    
    if (updateCompraDto.id_usuario) {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: updateCompraDto.id_usuario }
      });
      
      if (!usuario) {
        throw new NotFoundException(`Novo usuário com ID ${updateCompraDto.id_usuario} não encontrado`);
      }
      compra.usuario = usuario;
    }

    await this.compraRepository.save(compra);
    return this.findOne(id); // Retorna a compra atualizada
  }

  async remove(id: number) {
    const compra = await this.findOne(id); // Valida se existe
    await this.compraRepository.remove(compra);
    return { message: `Compra com ID ${id} removida com sucesso` };
  }
}