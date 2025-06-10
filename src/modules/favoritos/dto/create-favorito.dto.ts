// create-favorito.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateFavoritoDto {
    @IsNotEmpty()
    id_Usuario: number;

    @IsNotEmpty()
    id_Produto: number;
}
