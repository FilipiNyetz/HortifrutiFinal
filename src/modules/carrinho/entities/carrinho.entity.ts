import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Produto } from '../../produto/entities/produto.entity';
import { Expose } from 'class-transformer';

@Entity('carrinho')
export class Carrinho {
    @PrimaryGeneratedColumn()
    id_Carrinho: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    valorTotal: number;

    @Column({ default: 0 })
    quantidade: number;

    @OneToMany(() => Produto, (produto) => produto.carrinho, {
        nullable: true,
        eager: true // Carrega produtos automaticamente
    })
    @Expose() // Permite serialização quando usando ClassSerializerInterceptor
    produtos: Produto[];
}