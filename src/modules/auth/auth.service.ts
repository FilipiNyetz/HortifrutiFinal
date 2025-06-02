/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

async register(dto: RegisterDto) {
  const senhaCriptografada = await bcrypt.hash(dto.senha, 10);
  
  const usuarioData: CreateUsuarioDto = {
    username: dto.username,
    senha: senhaCriptografada,
    email: dto.email,
    role: dto.role,
    ...(dto.id_Endereco && { 
      id_Endereco: Number(dto.id_Endereco) // Conversão explícita
    })
  };

  return this.usuarioService.create(usuarioData);
}

  async login(dto: LoginDto) {
    const user = await this.usuarioService.findByUsername(dto.username);
    const valid = user && await bcrypt.compare(dto.senha, user.senha);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    return {
      access_token: this.jwtService.sign({
        sub: user.id_usuario,
        username: user.username,
        role: user.role,
      }),
    };
  }
}