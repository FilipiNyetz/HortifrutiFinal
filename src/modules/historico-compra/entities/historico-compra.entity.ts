import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Carrinho } from '../../carrinho/entities/carrinho.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { MetodoPagamento } from 'src/modules/metodo-pagamento/entities/metodo-pagamento.entity';
import { Avaliacao } from 'src/modules/avaliacao/entities/avaliacao.entity';

export enum CompraStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED',
}

@Entity('HistoricoCompra')
export class HistoricoCompra {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Carrinho, { nullable: false, eager: true })
    carrinho: Carrinho;

    @ManyToOne(() => Usuario, { nullable: false, eager: true })
    usuario: Usuario;

    @Column({ type: 'text' })
    status: CompraStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    valorTotal: number;

    @CreateDateColumn()
    dataCompra: Date;

    @ManyToOne(() => MetodoPagamento, metodo => metodo.historicos, { eager: true })
    metodoPagamento: MetodoPagamento;

    @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.historicoCompra)
    avaliacoes: Avaliacao[];

}

