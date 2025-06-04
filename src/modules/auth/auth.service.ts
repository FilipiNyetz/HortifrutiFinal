/* eslint-disable @typescript-eslint/no-unused-vars */
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
    console.log('[REGISTER] Dados recebidos:', dto);
    const senhaCriptografada = await bcrypt.hash(dto.senha, 10);
    console.log('[REGISTER] Senha criptografada:', senhaCriptografada);

    const usuarioData: CreateUsuarioDto = {
      username: dto.username,
      senha: senhaCriptografada,
      email: dto.email,
      role: dto.role,
      ...(dto.id_Endereco && { 
        id_Endereco: Number(dto.id_Endereco)
      })
    };

    console.log('[REGISTER] Dados do usuário para criação:', usuarioData);
    return this.usuarioService.create(usuarioData);
  }

  async login(dto: LoginDto) {
    console.log('[LOGIN] Tentativa de login com:', dto);
    
    try {
      // Alteração principal: usa findByUsernameOrEmail em vez de findByUsername
      const user = await this.usuarioService.findByUsernameOrEmail(dto.username);
      console.log('[LOGIN] Usuário encontrado no DB:', {
        id: user.id_usuario,
        username: user.username,
        email: user.email,
        role: user.role,
        senhaHash: '***HASH***' // Não mostra o hash real por segurança
      });

      console.log('[LOGIN] Comparando senhas...');
      const senhaValida = await bcrypt.compare(dto.senha, user.senha);
      console.log('[LOGIN] Resultado da comparação:', senhaValida);

      if (!senhaValida) {
        console.log('[LOGIN] Senha inválida');
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const payload = {
        sub: user.id_usuario,
        username: user.username,
        role: user.role,
      };
      console.log('[LOGIN] Payload do JWT:', payload);

      const token = this.jwtService.sign(payload);
      console.log('[LOGIN] Token gerado:', token);

      return {
        access_token: token,
        user: { // Adiciona informações básicas do usuário na resposta
          id: user.id_usuario,
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      console.error('[LOGIN] Erro durante login:', error);
      // Melhora a mensagem de erro para o cliente
      throw new UnauthorizedException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response?.message || 'Credenciais inválidas'
      );
    }
  }
}