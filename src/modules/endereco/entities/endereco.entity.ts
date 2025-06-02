 
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BeforeInsert, Column, PrimaryColumn, Entity, ManyToOne } from "typeorm";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Cidade } from "src/modules/cidades/entities/cidade.entity";

const { nanoid } = require("nanoid");

@Entity('endereco')
export class Endereco {

  @PrimaryColumn()
  id_endereco: string;

  @Column()
  rua: string;

  @Column()
  cep: string;

  @Column()
  complemento: string;

  @BeforeInsert()
  generateId() {
    this.id_endereco = `end_${nanoid()}`;
  }

  // Relacionamento com Usuario (muitos endereços para um usuário)
  @ManyToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario;

  // Relacionamento com Cidade (muitos endereços para uma cidade)
  @ManyToOne(() => Cidade, (cidade) => cidade.enderecos)
  cidade: Cidade;
}
