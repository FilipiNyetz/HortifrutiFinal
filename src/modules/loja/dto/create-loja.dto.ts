import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLojaDto {
    @IsString()
    nome: string;

    @IsString()
    telefone: string;

    @IsString()
    dados_bancarios: string;

    @IsNumber()
    usuarioId: number;  // FK para usuário lojista
}
