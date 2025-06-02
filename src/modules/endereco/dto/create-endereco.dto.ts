/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber } from 'class-validator';
import { Cidade } from 'src/modules/cidades/entities/cidade.entity';
import { ManyToOne } from 'typeorm';

export class CreateEnderecoDto {
  @IsString()
  CEP: string;

  @IsNumber()
  numero: number;

  @IsNumber()
  id_cidade: number
}
