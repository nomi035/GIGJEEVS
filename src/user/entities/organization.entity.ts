import { BaseEntity } from "base.entity";
import { Column, Entity } from "typeorm";

@Entity('Organization')
export class Organization extends BaseEntity {
    @Column()
    name: string;

    @Column()
    number: string;

    @Column({  })
    address: string;

    @Column()
    email: string;

}