// endereco.entity.ts
import { Cidade } from 'src/modules/cidades/entities/cidade.entity';
import { Loja } from 'src/modules/loja/entities/loja.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn()
  id_Endereco: number;

  @Column()
  CEP: string;

  @Column()
  numero: number;

  @ManyToOne(() => Cidade, (cidade) => cidade.enderecos, { eager: true, onDelete: 'CASCADE', nullable: false })
  cidade: Cidade;

  
  @OneToOne(() => Loja, (loja) => loja.endereco)
  loja: Loja;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario;
  
  

}
