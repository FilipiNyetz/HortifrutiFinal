import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  complemento: string;

  @IsString()
  @IsNotEmpty()
  nomeCidade: string;

  @IsString()
  @IsNotEmpty()
  nomeUsuario: string;
}

