/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, PrimaryColumn, Entity, ManyToOne, OneToOne } from "typeorm";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Cidade } from "src/modules/cidades/entities/cidade.entity";
import { Loja } from "src/modules/loja/entities/loja.entity";

@Entity('endereco')
export class Endereco {

  @PrimaryColumn()
  id_endereco: number;

  @Column()
  rua: string;

  @Column()
  cep: string;

  @Column()
  complemento: string;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario;

  @OneToOne(() => Loja, (loja) => loja.endereco)
  loja: Loja;

  @ManyToOne(() => Cidade, (cidade) => cidade.enderecos)
  cidade: Cidade;
}

