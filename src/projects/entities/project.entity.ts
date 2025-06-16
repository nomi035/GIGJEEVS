import { BaseEntity } from "base.entity";
import { Organization } from "src/user/entities/organization.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('Project')
export class Project extends BaseEntity{
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({ nullable: true })
    startDate: Date;
    @Column({ nullable: true })
    endDate: Date;
    @ManyToOne(()=> Organization)
    @JoinColumn()
    organization: Organization;
     @ManyToOne(()=> User)
    @JoinColumn()
    user: User;
}
