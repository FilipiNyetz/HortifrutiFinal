/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity'
import { Endereco } from "src/modules/endereco/entities/endereco.entity";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { nanoid } = require('nanoid');

@Entity('cidades')
export class Cidade {
    @PrimaryColumn()
    id_cidade: string;

    @Column()
    nomeCidade: string;

    @ManyToOne(() => Uf, (uf) => uf.cidades, { onDelete: 'CASCADE', eager: true })
    uf: Uf;

    // cidade.entity.ts
    @BeforeInsert()
    generateId() {this.id_cidade = `cid_${nanoid()}`} // é uma string (ex: "cid_abc123")


    @OneToMany(() => Endereco, (endereco) => endereco.cidade)
    enderecos: Endereco[];
}
