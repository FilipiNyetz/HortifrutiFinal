<<<<<<< HEAD
// cidade.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity';
import { Endereco } from "src/modules/endereco/entities/endereco.entity";
=======
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity'
import { Endereco } from "src/modules/endereco/entities/endereco.entity";

const { nanoid } = require('nanoid');
>>>>>>> 68317a1 (wip: alterações locais antes do rebase)

@Entity('cidades')
export class Cidade {
    @PrimaryGeneratedColumn()
    id_cidade: number;  

    @Column()
    nomeCidade: string;

    @ManyToOne(() => Uf, (uf) => uf.cidades, { onDelete: 'CASCADE', eager: true })
    uf: Uf;

<<<<<<< HEAD
    @OneToMany(() => Endereco, (endereco) => endereco.cidade)
    enderecos: Endereco[];
=======
    @BeforeInsert()
    generateId() {this.id_cidade = `cid_${nanoid()}`}
    
    // cidade.entity.ts
    @OneToMany(() => Endereco, (endereco) => endereco.cidade)
    enderecos: Endereco[];
    




>>>>>>> 68317a1 (wip: alterações locais antes do rebase)
}
