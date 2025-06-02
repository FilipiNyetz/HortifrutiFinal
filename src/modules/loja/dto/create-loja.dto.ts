import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateLojaDto {
    @IsString()
    nome: string;

    @IsString()
    endereco: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    telefone: string;

    @IsString()
    senha: string;

    @IsString()
    dados_bancarios: string;
}
