/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, UserRole } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import * as bcrypt from 'bcrypt';

type EnderecoOrNull = Endereco | null;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  const { username, email, senha, role, id_Endereco } = createUsuarioDto;

  const endereco: EnderecoOrNull = id_Endereco 
    ? await this.enderecoRepository.findOneBy({ id_endereco: id_Endereco })
    : null;

  if (id_Endereco && !endereco) {
    throw new NotFoundException(`Endereço com ID ${id_Endereco} não encontrado`);
  }

  const usuarioData = {
    username,
    email,
    senha: await bcrypt.hash(senha, 10),
    role,
    endereco
  };

  return this.usuarioRepository.save(this.usuarioRepository.create(usuarioData));
}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['endereco'] });
  }

  async findOne(id: number): Promise<Usuario | null> { // Alterado para number
    return this.usuarioRepository.findOne({ 
      where: { id_usuario: id },
      relations: ['endereco']
    });
  }

   async update(id: number, updateDto: Partial<CreateUsuarioDto>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    // Atualiza apenas os campos fornecidos
    if (updateDto.username !== undefined) usuario.username = updateDto.username;
    if (updateDto.email !== undefined) usuario.email = updateDto.email;
    
    if (updateDto.senha !== undefined) {
      usuario.senha = await bcrypt.hash(updateDto.senha, 10);
    }
    
    if (updateDto.role !== undefined) usuario.role = updateDto.role;
    
    if (updateDto.id_Endereco !== undefined) {
      const endereco = await this.enderecoRepository.findOneBy({ 
        id_endereco: updateDto.id_Endereco 
      });
      
      if (!endereco) {
        throw new NotFoundException(`Endereço com ID ${updateDto.id_Endereco} não encontrado`);
      }
      
      usuario.endereco = endereco;
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> { // Alterado para number
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }

private async findEndereco(id: number): Promise<EnderecoOrNull> {
  return this.enderecoRepository.findOneBy({ id_endereco: id });
}


  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ 
      where: { username },
      relations: ['endereco']
    });
  }
}