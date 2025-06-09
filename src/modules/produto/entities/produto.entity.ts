import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Loja } from '../../loja/entities/loja.entity';
import { Categoria } from "src/modules/categoria/entities/categoria.entity";
import { Carrinho } from '../../carrinho/entities/carrinho.entity';
import { Exclude } from 'class-transformer';
import { Favorito } from "src/modules/favoritos/entities/favorito.entity";

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

    @OneToMany(() => Favorito, (favorito) => favorito.produto)
    favoritos: Favorito[];
}