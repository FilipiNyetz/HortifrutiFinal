import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @IsNotEmpty()
    nome_categoria: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;


}
