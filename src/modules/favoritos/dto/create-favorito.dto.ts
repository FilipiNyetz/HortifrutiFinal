// create-favorito.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavoritoDto {
    @IsInt()
    @IsNotEmpty()
    id_Usuario: number;

    @IsInt()
    @IsNotEmpty()
    id_Produto: number;
}
