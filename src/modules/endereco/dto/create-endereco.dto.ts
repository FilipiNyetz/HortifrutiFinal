import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  id_Cidade: number
}

