/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TipoPagamento } from '../dto/create-metodo-pagamento.dto';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { HistoricoCompra } from 'src/modules/historico-compra/entities/historico-compra.entity';

@Entity()
export class MetodoPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',       // usar string no banco
    enum: Object.values(TipoPagamento),  // array dos valores do enum para validação
  })
  tipo: TipoPagamento;

  @Column({ nullable: true })
  chave_pix?: string;

  @Column({ nullable: true })
  numero_cartao_debito?: string;

  @Column({ nullable: true })
  numero_cartao_credito?: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.metodosPagamento, {
    onDelete: 'CASCADE',
    eager: true,
  })
  usuario: Usuario;

  @OneToMany(() => HistoricoCompra, historico => historico.metodoPagamento)
  historicos: HistoricoCompra[];
}
