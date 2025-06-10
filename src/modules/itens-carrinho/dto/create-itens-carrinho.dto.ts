import { IsNumber } from "class-validator";

export class CreateItensCarrinhoDto {
    @IsNumber()
    carrinhoId: number;

    @IsNumber()
    produtoId: number;

    @IsNumber()
    quantidade: number;
}
