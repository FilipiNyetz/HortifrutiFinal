import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Cidade } from '../cidades/entities/cidade.entity';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco, Cidade])],
  controllers: [EnderecoController],
  providers: [EnderecoService],
})
export class EnderecoModule {}
