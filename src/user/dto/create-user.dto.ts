import { Organization } from '../entities/organization.entity';
import { Role } from '../entities/user.entity';
import { IsOptional } from 'class-validator';

export class CreateUserDto {

  name: string;

  password: string;

  email: string;
  phone: string;


  address: string;

  organization: Organization;
  role: Role;
  socketId:string;
}
