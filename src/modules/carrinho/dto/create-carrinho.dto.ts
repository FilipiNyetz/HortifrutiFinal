import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarrinhoDto {
    @IsString()
    @IsNotEmpty()
    idProduto: string;

    @IsNumber()
    @IsNotEmpty()
    valorTotal: number;

    @IsNumber()
    @IsNotEmpty()
    quantidade: number;
}
