import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Loja } from '../../loja/entities/loja.entity';

export class CreateProdutoDto {
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsNumber()
    id_categoria: number;

    @IsNumber()
    id_loja: number
}
