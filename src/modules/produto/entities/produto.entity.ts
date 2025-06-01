import { BeforeInsert, PrimaryGeneratedColumn,Column, PrimaryColumn, Entity } from "typeorm";
import { Loja } from 'src/loja/entities/loja.entity';

@Entity('produto')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string; 

    @Column()
    quantidade: number;
    
    @Column()
    id_Categoria: string;

    @Column()
    valor: number;

  @ManyToOne(() => Loja, (loja) => loja.produtos, {
        onDelete: 'CASCADE',
        eager: true,
    })
    loja: Loja;
    static loja: any;    
}
