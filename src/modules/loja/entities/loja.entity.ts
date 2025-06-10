/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import { Produto } from '../../produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Estoque } from 'src/modules/estoque/entities/estoque.entity';
import { Avaliacao } from 'src/modules/avaliacao/entities/avaliacao.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id_Loja: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  dados_bancarios: string;

  @OneToMany(() => Produto, (produto) => produto.loja)
  produtos: Produto[];

  @OneToMany(() => Estoque, (estoque) => estoque.loja)
  estoques: Estoque[];


  @OneToMany(() => Avaliacao, avaliacao => avaliacao.loja)
  avaliacoes: Avaliacao[];

  @ManyToOne(() => Usuario, usuario => usuario.lojas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
