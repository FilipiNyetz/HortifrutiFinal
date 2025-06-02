import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const senhaCriptografada = await bcrypt.hash(dto.senha, 10);
    return this.usuarioService.create({
      ...dto,
      senha: senhaCriptografada,
    });
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
