import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEstoqueDto {

    @IsNumber()
    @IsNotEmpty()
    quantidade: number;

    @IsNumber()
    lojaId: number;

    @IsNumber()
    produtoId: number;
}
