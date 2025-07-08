import { BaseEntity } from "base.entity";
import { Column } from "typeorm";

export class Discussion extends BaseEntity{
@Column()
title:string;
@Column()
description:string;

}
