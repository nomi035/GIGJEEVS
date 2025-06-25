import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find({
      relations: ['organization','manager'],
      order:{
        id: 'DESC', // Order by id in descending order
      }// Assuming you want to include organization details
    });
  }
  findByOrganizationId(organizationId: number) {
    return this.projectRepository.find({
      where: { organization: { id: organizationId } },
      relations: ['organization'],
      order:{
        id: 'DESC', // Order by id in descending order
      } // Include organization details if needed
    });
  }

  findByManagerId(managerId: number) {
    return this.projectRepository.find({
      where: { manager: { id: managerId } },
      order: {
        id: 'DESC', // Order by id in descending order
      },
      // Include manager and organization details if needed
    });
  }

  findByEmployeeId(employeeId: number) {
    return this.projectRepository.find({
      where:{teamMembers:{id:employeeId}}

    })
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['teamMembers'], // Assuming you want to include organization details
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
  async addTeam(id:number,teamMembers:User[]){
    const project = await this.projectRepository.findOne({
      where:{id},
      relations: ['teamMembers'] // Assuming teamMembers is a relation in the Project entity
    })
    project.teamMembers=teamMembers
    return this.projectRepository.save(project);
  }
}
