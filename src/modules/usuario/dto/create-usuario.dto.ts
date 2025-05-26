import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { UserRole } from '../entities/usuario.entity'; // ajuste o caminho conforme sua estrutura

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()  // Se o perfil for opcional na criação e defaultar para USER
  tipoPerfil?: UserRole;

  @IsNumber()
  id_Endereco: number
}
