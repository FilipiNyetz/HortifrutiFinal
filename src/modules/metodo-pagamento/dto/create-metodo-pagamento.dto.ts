import {
  IsEnum,
  IsString,
  ValidateIf,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export enum TipoPagamento {
  PIX = 'pix',
  CARTAO_DE_DEBITO = 'cartao_de_debito',
  CARTAO_DE_CREDITO = 'cartao_de_credito',
}

export class CreateMetodoPagamentoDto {
  @IsEnum(TipoPagamento)
  tipo: TipoPagamento;

  @ValidateIf((o: CreateMetodoPagamentoDto) => o.tipo === TipoPagamento.PIX)
  @IsString()
  @IsNotEmpty()
  chave_pix: string;

  @ValidateIf((o: CreateMetodoPagamentoDto) => o.tipo === TipoPagamento.CARTAO_DE_DEBITO)
  @IsString()
  @IsNotEmpty()
  numero_cartao_debito: string;

  @ValidateIf((o: CreateMetodoPagamentoDto) => o.tipo === TipoPagamento.CARTAO_DE_CREDITO)
  @IsString()
  @IsNotEmpty()
  numero_cartao_credito: string;

  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;
}
