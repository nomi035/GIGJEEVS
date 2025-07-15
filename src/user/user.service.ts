import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreatOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}
async  create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }
  async getAllOrganizations() {
    return await this.organizationRepository.find();
  }
 async getOrganizationById(id: number) {
    return await this.organizationRepository.findOne({where:{id}});
  }

  async updateOrganization(id: number, updateUserDto: UpdateOrganizationDto) {
    return await this.organizationRepository.update(id, updateUserDto);
  }

  async removeOrganization(id: number) {
    return await this.organizationRepository.delete(id);
  }

  async createOrganization(createOrganizationDto: CreatOrganizationDto) {
    return await this.organizationRepository.save(createOrganizationDto);
  }

async updateSocketId(socketId:string,userId:number){
  const user=await this.findOne(userId)
  user.socketId=socketId
  await this.usersRepository.save(user)
  
}

 async findAll(role:Role) {
   return await this.usersRepository.find({
    where: {
      role
    }

   });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({where:{email},relations: ['organization']});

  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

    async findByIds(ids: User[]) {
     return this.usersRepository.find({
      where: {
        id: In(ids),
  }
    });
  }
}
