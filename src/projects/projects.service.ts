import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

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
      relations: ['organization'],
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

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['organization'], // Assuming you want to include organization details
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
