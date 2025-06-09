import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, UserRole } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../usuario/dto/update-usuario.dto'; // Crie este DTO
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { username, email, senha, role, id_Endereco } = createUsuarioDto;

    // Verifica se username ou email já existem
    const existingUser = await this.usuarioRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username ou email já estão em uso');
    }

    const endereco = id_Endereco
      ? await this.enderecoRepository.findOneBy({ id_endereco: id_Endereco })
      : null;

    if (id_Endereco && !endereco) {
      throw new NotFoundException(`Endereço com ID ${id_Endereco} não encontrado`);
    }

    const usuario = this.usuarioRepository.create({
      username,
      email,
      senha,
      role: role || UserRole.USER, // Valor padrão
      endereco
    });

    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['endereco'] });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      relations: ['endereco']
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id); // Já inclui a verificação de existência

    // Atualização segura dos campos
    if (updateDto.username !== undefined) {
      const existingUser = await this.usuarioRepository.findOne({
        where: { username: updateDto.username }
      });

      if (existingUser && existingUser.id_usuario !== id) {
        throw new ConflictException('Username já está em uso');
      }

      usuario.username = updateDto.username;
    }

    if (updateDto.email !== undefined) {
      const existingUser = await this.usuarioRepository.findOne({
        where: { email: updateDto.email }
      });

      if (existingUser && existingUser.id_usuario !== id) {
        throw new ConflictException('Email já está em uso');
      }

      usuario.email = updateDto.email;
    }

    if (updateDto.senha !== undefined) {
      usuario.senha = await bcrypt.hash(updateDto.senha, 10);
    }

    if (updateDto.role !== undefined) {
      usuario.role = updateDto.role;
    }

    if (updateDto.id_Endereco !== undefined) {
      usuario.endereco = updateDto.id_Endereco
        ? await this.enderecoRepository.findOneBy({ id_endereco: updateDto.id_Endereco })
        : null;

      if (updateDto.id_Endereco && !usuario.endereco) {
        throw new NotFoundException(`Endereço com ID ${updateDto.id_Endereco} não encontrado`);
      }
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id); // Reutiliza a verificação de existência
    await this.usuarioRepository.remove(usuario);
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha') // Força o select da senha
      .leftJoinAndSelect('usuario.endereco', 'endereco') // Mantém a relação com endereco
      .where('usuario.username = :usernameOrEmail', { usernameOrEmail })
      .orWhere('usuario.email = :usernameOrEmail', { usernameOrEmail })
      .getOne();

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com username/email ${usernameOrEmail} não encontrado`
      );
    }

    console.log('Usuário encontrado:', {
      id: usuario.id_usuario,
      username: usuario.username,
      email: usuario.email
    });

    return usuario;
  }

}