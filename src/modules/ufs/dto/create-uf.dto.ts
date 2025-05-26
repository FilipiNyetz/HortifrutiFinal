import { IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class CreateUfDto {

    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    sigla: string;

    @IsString()
    @IsNotEmpty()
    nome_do_estado: string;


}
