import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';

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
}
