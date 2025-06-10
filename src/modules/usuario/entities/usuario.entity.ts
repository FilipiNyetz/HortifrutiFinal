/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Endereco } from 'src/modules/endereco/entities/endereco.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Compra } from 'src/modules/compra/entities/compra.entity';
import { Favorito } from 'src/modules/favoritos/entities/favorito.entity';
import { Avaliacao } from 'src/modules/avaliacao/entities/avaliacao.entity';
import { MetodoPagamento } from 'src/modules/metodo-pagamento/entities/metodo-pagamento.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';

export enum UserRole {
  USER = 'USER',
  ENTREGADOR = 'ENTREGADOR',
  LOJISTA = 'LOJISTA',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Compra, compra => compra.usuario)
  compras: Compra[];

  @OneToMany(() => Favorito, (favorito) => favorito.usuario)
  favoritos: Favorito[];

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.usuario)
  avaliacoes: Avaliacao[];

  @OneToMany(() => MetodoPagamento, (metodo) => metodo.usuario)
  metodosPagamento: MetodoPagamento[];

  @OneToOne(() => Endereco, endereco => endereco.usuario, { cascade: true, eager: true })
  @JoinColumn() // FK fica aqui
  endereco: Endereco | null;

  @OneToMany(() => Loja, loja => loja.usuario, { nullable: true })
  lojas?: Loja[];

}
