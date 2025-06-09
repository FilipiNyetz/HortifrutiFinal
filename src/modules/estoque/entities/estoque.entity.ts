import { Loja } from "src/modules/loja/entities/loja.entity";
import { Produto } from "src/modules/produto/entities/produto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('estoque')
export class Estoque {

    @PrimaryGeneratedColumn()
    id_estoque: number;

    @Column()
    quantidade: number;

    @Column()
    produtoId: number;

    @Column()
    lojaId: number;

    @ManyToOne(() => Produto, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'produtoId' }) // <- garante o nome certo
    produto: Produto;

    @ManyToOne(() => Loja, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lojaId' }) // <- garante o nome certo
    loja: Loja;
}
