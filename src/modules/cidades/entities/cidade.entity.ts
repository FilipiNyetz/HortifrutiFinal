/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity'
import { Endereco } from "src/modules/endereco/entities/endereco.entity";

// eslint-disable-next-line @typescript-eslint/no-require-imports

@Entity('cidades')
export class Cidade {
    @PrimaryGeneratedColumn()
    id_cidade: number;

    @Column()
    nomeCidade: string;

    @ManyToOne(() => Uf, (uf) => uf.cidades, { onDelete: 'CASCADE', eager: true })
    uf: Uf;

    @OneToMany(() => Endereco, (endereco) => endereco.cidade)
    enderecos: Endereco[];
}
