import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Carrinho } from '../../carrinho/entities/carrinho.entity';
import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Endereco } from "src/modules/endereco/entities/endereco.entity";

@Entity('entrega')
export class Entrega {

    @PrimaryGeneratedColumn()
    id_entrega: number;

    @Column()
    dataPedido: Date;

    @Column()
    dataEntrega: Date;
    
    @Column()
    status: string;

    @ManyToOne(() => Carrinho, { eager: true, onDelete: 'SET NULL' })
    carrinho: Carrinho;

    @ManyToOne(() => Usuario, { eager: true, onDelete: 'SET NULL' })
    usuario: Usuario;

    @ManyToOne(() => Endereco, { eager: true, onDelete: 'SET NULL' })
    endereco: Endereco;

}
