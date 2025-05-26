/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require('nanoid');

@Entity('categoria')
export class Categoria {

    @PrimaryColumn()
    id_categoria: string;

    @Column()
    nome_categoria: string;

    @Column()
    descricao: string;

    @BeforeInsert()
    generateId() {
        this.id_categoria = `cat_${nanoid()}`
    }

}
