import { BaseEntity } from "base.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";



export enum TaskStatus {

    INPROGRESS = 'inprogress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'

}
@Entity('tasks')
export class Task extends BaseEntity{
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default:TaskStatus.INPROGRESS
    })
    status: TaskStatus;

    @ManyToOne(()=> User)
    @JoinColumn()
    taskFor:User

    @ManyToOne(()=> Project,{onDelete: 'CASCADE'})
    @JoinColumn()
    taskOf:Project

    @Column({
        nullable: true,
    })
    comment: string;


}

