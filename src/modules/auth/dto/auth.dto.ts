/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsEmail, IsIn, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '../../usuario/entities/usuario.entity';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  senha: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNumber()
  @IsOptional()
  id_Endereco?: number; // Tipo number aqui também
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  senha: string;
}