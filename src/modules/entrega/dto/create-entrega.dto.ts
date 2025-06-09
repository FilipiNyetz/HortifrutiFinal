import { IsNotEmpty, IsString } from "class-validator";

export class CreateEntregaDto {

    @IsString()
    dataPedido: string;

    @IsString()
    dataEntrega: string;

    @IsString()
    status: string;

    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_carrinho: number;

    @IsNotEmpty()
    id_endereco: number;

}
