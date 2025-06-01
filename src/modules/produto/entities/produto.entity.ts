import { BeforeInsert, PrimaryGeneratedColumn, Column, PrimaryColumn, Entity, ManyToOne } from "typeorm";
import { Loja } from '../../loja/entities/loja.entity';

@Entity('produto')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    quantidade: number;

    // @Column()
    // id_Categoria: string; Vai ser util quando tiver o relacionamento com categoria

    @Column()
    categoria:string

    @Column()
    valor: number;

    @ManyToOne(() => Loja, (loja) => loja.produtos, {
        onDelete: 'CASCADE',
        eager: true,
    })
    loja: Loja;
    static loja: any;
}
