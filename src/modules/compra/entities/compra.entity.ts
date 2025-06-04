 
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  id_compra: number;

  @ManyToOne(() => Usuario, usuario => usuario.compras)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}