import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('messages')
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
