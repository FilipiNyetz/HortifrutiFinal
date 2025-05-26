/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity'

const { nanoid } = require('nanoid');

@Entity('cidades')
export class Cidade {
    @PrimaryColumn()
    id_cidade: string;

    @Column()
    nomeCidade: string;

    @ManyToOne(() => Uf, (uf) => uf.cidades, {onDelete: 'CASCADE',
    eager: true,
    })
    uf: Uf;

    @BeforeInsert()
    generateId() {this.id_cidade = `cid_${nanoid()}`}

}
