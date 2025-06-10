import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';
import { HistoricoCompra } from 'src/modules/historico-compra/entities/historico-compra.entity';
import { ItemCarrinho } from 'src/modules/itens-carrinho/entities/itens-carrinho.entity';

@Entity('avaliacoes')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id_Avaliacao: number;

    @Column()
    comentario: string;

    @Column()
    nota: number;

    @ManyToOne(() => Loja, (loja) => loja.avaliacoes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_Loja' })
    loja: Loja;

    @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_Usuario' })
    usuario: Usuario;

    @ManyToOne(() => HistoricoCompra, (historico) => historico.avaliacoes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_HistoricoCompra' })
    historicoCompra: HistoricoCompra;

}
