import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';
import { Loja } from 'src/loja/entities/loja.entity';
import { ManyToOne } from 'typeorm';

export class CreateProdutoDto {
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsPositive()
    preco: number;

    @IsInt()
    @IsPositive()
    quantidade: number;

    @IsString()
    categoria: string;

    @IsNumber()
    id_loja: number;
}
