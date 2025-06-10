import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { ItemCarrinho } from "src/modules/itens-carrinho/entities/itens-carrinho.entity";

@Entity('carrinho')
export class Carrinho {
    @PrimaryGeneratedColumn()
    id_Carrinho: number;

    @Column({ type: 'real', default: 0 })
    valorTotal: number;

    @Column({ type: 'int', default: 0 })
    quantidade: number;

    @OneToMany(() => ItemCarrinho, item => item.carrinho, { cascade: true, eager: true })
    itens: ItemCarrinho[];

}
