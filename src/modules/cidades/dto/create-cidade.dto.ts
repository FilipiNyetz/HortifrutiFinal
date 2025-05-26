import { IsNotEmpty, IsString, IsUppercase } from 'class-validator';

export class CreateCidadeDto {
  @IsString()
  @IsNotEmpty()
  nomeCidade: string;

  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  ufSigla: string;
}
