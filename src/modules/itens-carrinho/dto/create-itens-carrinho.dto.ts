import { IsNumber } from "class-validator";

export class CreateItensCarrinhoDto {
    @IsNumber()
    produtoId: number;

    @IsNumber()
    carrinhoId: number;

    @IsNumber()
    quantidade: number;
}
