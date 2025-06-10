import { IsEnum, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { CompraStatus } from '../entities/historico-compra.entity';

export class CreateHistoricoCompraDto {
    @IsNumber()
    carrinhoId: number;

    @IsNumber()
    usuarioId: number;

    @IsEnum(CompraStatus, { message: 'Status inválido. Deve ser PENDING, CANCELED ou COMPLETED.' })
    status: CompraStatus;


    @IsDateString()
    dataPagamento?: string; // ISO date string, quando o pagamento for realizado
}
