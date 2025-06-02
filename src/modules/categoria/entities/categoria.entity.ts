/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Produto } from "src/modules/produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nome_categoria: string;

    @Column()
    descricao: string;

    @OneToMany(() => Produto, produto => produto.categoria)
    produtos: Produto[];
}
