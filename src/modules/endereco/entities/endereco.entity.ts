


import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Cidade } from "src/modules/cidades/entities/cidade.entity";
import { Loja } from "src/modules/loja/entities/loja.entity";

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn() // Alterado para auto-incremento
  id_endereco: number;

  @Column()
  rua: string;

  @Column()
  cep: string;

  @Column()
  complemento: string;

  @OneToOne(() => Usuario, usuario => usuario.endereco)
  usuario: Usuario;

  @ManyToOne(() => Cidade, (cidade) => cidade.enderecos)
  cidade: Cidade;
}


