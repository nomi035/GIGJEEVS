import { BaseEntity } from "base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('notes')
export class Note extends BaseEntity {

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' } )
    @JoinColumn()
    createdBy: User;
}
