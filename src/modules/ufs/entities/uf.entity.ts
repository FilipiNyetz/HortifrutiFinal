/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Cidade } from '../../cidades/entities/cidade.entity'

const { nanoid } = require('nanoid');

@Entity('ufs')
export class Uf {
    
    @PrimaryColumn()
    id_ufs: string;

    @Column()
    sigla: string;
    
    @Column()
    nome_do_estado: string;

    @BeforeInsert()
    generateId() {this.id_ufs = `uf_${nanoid()}`}

    @OneToMany(() => Cidade, (cidade) => cidade.uf)
    cidades: Cidade[];

}
