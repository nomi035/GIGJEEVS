import { BaseEntity } from 'base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';

@Entity('User')
export class User extends BaseEntity {
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  address: string;
   @Column({ nullable: true })
  socketId: string;
  @Column({ nullable: true })
  role: Role;
  

  @ManyToOne(() => Organization, {})
  @JoinColumn()
  organization: Organization;
}

export enum Role {
  MANAGER = 'manager',
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}
