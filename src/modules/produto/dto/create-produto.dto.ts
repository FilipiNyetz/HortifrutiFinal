import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';
import { Loja } from '../../loja/entities/loja.entity';

export class CreateProdutoDto {
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsInt()
    @IsPositive()
    quantidade: number;

    @IsNumber()
    id_categoria: number;

    @IsNumber()
    id_loja: number
}
