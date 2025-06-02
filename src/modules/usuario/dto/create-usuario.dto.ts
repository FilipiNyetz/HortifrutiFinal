import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

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
  @IsOptional()
  role?: UserRole;

  @IsNumber()
  @IsOptional()
  id_Endereco?: number; // Alterado para number (consistente com a entidade)
}