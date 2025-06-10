import { IsNumber } from "class-validator";

export class CreateItensCarrinhoDto {
    @IsNumber()
    id_Carrinho: number;

    @IsNumber()
    produtoId: number;

    @IsNumber()
    quantidade: number;
}
