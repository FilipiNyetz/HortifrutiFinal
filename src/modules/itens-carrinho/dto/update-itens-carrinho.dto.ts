import { PartialType } from '@nestjs/mapped-types';
import { CreateItensCarrinhoDto } from './create-itens-carrinho.dto';

export class UpdateItensCarrinhoDto extends PartialType(CreateItensCarrinhoDto) {}
