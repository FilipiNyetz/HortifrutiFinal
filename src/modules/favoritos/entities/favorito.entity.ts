import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Produto } from 'src/modules/produto/entities/produto.entity';

@Entity('favoritos')
export class Favorito {
    @PrimaryGeneratedColumn()
    id_Favorito: number;

    @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_Usuario' })
    usuario: Usuario;

    @ManyToOne(() => Produto, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_Produto' })
    produto: Produto;

    @Column()
    data: string; // Você também pode usar @CreateDateColumn se quiser gerar automaticamente a data
}
