// endereco.entity.ts
import { Cidade } from 'src/modules/cidades/entities/cidade.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
