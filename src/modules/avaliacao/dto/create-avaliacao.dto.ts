import { IsString, IsNumber } from 'class-validator';

export class CreateAvaliacaoDto {
    @IsString()
    comentario: string;

    @IsNumber()
    nota: number;

    @IsNumber()
    id_HistoricoCompra: number;

    @IsNumber()
    id_Usuario: number;

    @IsNumber()
    id_Loja: number;

}
