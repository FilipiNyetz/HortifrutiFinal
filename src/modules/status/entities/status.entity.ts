/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrimaryColumn, Column, BeforeInsert, Entity } from "typeorm";

const { nanoid } = require('nanoid');

@Entity('status')
export class Status {

    @PrimaryColumn()
    id_status: string;

    @Column()
    estado: string;

    @BeforeInsert()
    generateId() {
        this.id_status = `status_${nanoid()}`
    }


}
