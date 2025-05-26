/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  CEP: string;

  @IsNumber()
  numero: number;

  @IsString()
  id_Cidade: string;
}
