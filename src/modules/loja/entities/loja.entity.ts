import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id_Loja: number;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    senha: string;

    @Column()
    dados_bancarios: string;

    @OneToMany(() => Produto, (produto) => Produto.loja)
    produtos: Produto[];
}
