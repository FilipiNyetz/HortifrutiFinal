
import { BeforeInsert, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('carrinho')
export class Carrinho {
     @PrimaryGeneratedColumn()
    id_Carrinho: number;

    @Column()
    idProduto: string; 

   @Column()
    valorTotal: number;

   @Column()
    quantidade: number;
} 
