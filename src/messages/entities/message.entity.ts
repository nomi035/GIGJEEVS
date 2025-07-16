import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, ManyToOne } from "typeorm";

export class Message extends BaseEntity{
    @Column()
    messageBody:string

    @ManyToOne(()=> User, { onDelete: 'CASCADE' })
    @JoinColumn()
    sendBy:User

    @ManyToOne(()=> User, { onDelete: 'CASCADE' })
    @JoinColumn()
    receivedBy:User



}
