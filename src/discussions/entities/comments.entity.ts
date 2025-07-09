
import { BaseEntity } from "base.entity";
import { join } from "path";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, } from "typeorm";
import { Discussion } from "./discussion.entity";

@Entity('comments')
export class Comments extends BaseEntity{

    @Column()
    comment: string;

    @ManyToOne(()=> User)
    @JoinColumn()
    commentedBy:User;

    @ManyToOne(() => Discussion, { onDelete: 'CASCADE' })
    @JoinColumn()
    discussion:Discussion
}