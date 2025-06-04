import { IsNumber } from "class-validator";

export class CreateCompraDto {
    @IsNumber()
    id_usuario: number;
}
