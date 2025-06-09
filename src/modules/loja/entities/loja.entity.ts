/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import { Produto } from '../../produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Estoque } from 'src/modules/estoque/entities/estoque.entity';
import { Avaliacao } from 'src/modules/avaliacao/entities/avaliacao.entity';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id_Loja: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  senha: string;

  @Column()
  dados_bancarios: string;

  @OneToMany(() => Produto, (produto) => produto.loja)
  produtos: Produto[];

  @OneToOne(() => Endereco, (endereco) => endereco.loja, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco: Endereco;

  @OneToMany(() => Estoque, (estoque) => estoque.loja)
  estoques: Estoque[];


  @OneToMany(() => Avaliacao, avaliacao => avaliacao.loja)
  avaliacoes: Avaliacao[];
}
