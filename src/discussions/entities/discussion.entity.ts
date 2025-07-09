import { BaseEntity } from "base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Comments } from "./comments.entity";
import { User } from "src/user/entities/user.entity";

@Entity('discussions')
export class Discussion extends BaseEntity{
@Column()
title:string;
@Column()
description:string;

@ManyToOne(()=> User)
@JoinColumn()
discussionBy:User

@OneToMany(() => Comments, (comments) => comments.discussion, { cascade: true })
comments: Comments[];
}