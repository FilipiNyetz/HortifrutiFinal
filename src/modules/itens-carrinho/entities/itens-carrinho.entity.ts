import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Carrinho } from '../../carrinho/entities/carrinho.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('ItemCarrinho')
export class ItemCarrinho {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Carrinho, carrinho => carrinho.itens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'carrinho_id' })
    carrinho: Carrinho;

    @ManyToOne(() => Produto, produto => produto.itensCarrinho, { eager: true })
    @JoinColumn({ name: 'produto_id' })
    produto: Produto;

    @Column({ type: 'int', default: 1 })
    quantidade: number;
}
