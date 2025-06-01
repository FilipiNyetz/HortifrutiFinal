import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    quantidade: number;
 
    @IsString()
    @IsNotEmpty()
    id_Produto: string;
 
    @IsString()
    @IsNotEmpty()
    id_Categoria: string;

    @IsNumber()
    @IsNotEmpty()
    valor: number;
}
