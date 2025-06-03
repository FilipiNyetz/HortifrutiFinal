import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCarrinhoDto {
    @IsString()
    @IsOptional()
    idProduto?: number | null; // Permite string, null ou undefined

    @IsNumber()
    @IsOptional()
    valorTotal?: number | null;

    @IsNumber()
    @IsOptional()
    quantidade?: number | null;
}