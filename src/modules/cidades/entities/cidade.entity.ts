// cidade.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Uf } from '../../ufs/entities/uf.entity';
import { Endereco } from "src/modules/endereco/entities/endereco.entity";

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
