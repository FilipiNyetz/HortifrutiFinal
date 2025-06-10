import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoCompraDto } from './create-historico-compra.dto';

export class UpdateHistoricoCompraDto extends PartialType(CreateHistoricoCompraDto) {}
