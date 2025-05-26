import { Injectable } from '@nestjs/common';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';

@Injectable()
export class MetodoPagamentoService {
  create(createMetodoPagamentoDto: CreateMetodoPagamentoDto) {
    return 'This action adds a new metodoPagamento';
  }

  findAll() {
    return `This action returns all metodoPagamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metodoPagamento`;
  }

  update(id: number, updateMetodoPagamentoDto: UpdateMetodoPagamentoDto) {
    return `This action updates a #${id} metodoPagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodoPagamento`;
  }
}
