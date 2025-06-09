import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Loja } from '../../loja/entities/loja.entity';
import { Categoria } from "src/modules/categoria/entities/categoria.entity";
import { Carrinho } from '../../carrinho/entities/carrinho.entity';
import { Exclude } from 'class-transformer';

@Entity('produto')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @ManyToOne(() => Loja, (loja) => loja.produtos, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'loja_id' })
    loja: Loja;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
        eager: true
    })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @ManyToOne(() => Carrinho, (carrinho) => carrinho.produtos, {
        onDelete: 'SET NULL',
        nullable: true
    })
    @Exclude() // Evita a serialização circular
    @JoinColumn({ name: 'carrinho_id' })
    carrinho: Carrinho | null;
}