import { Inject, Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
  ) {}
  // The repository is injected for database operations, but here it's not used.
  // You might want to implement actual database logic using this repository.

  create(createSprintDto: CreateSprintDto) {
    return this.sprintRepository.save(createSprintDto);
  }

  findAll() {
    return this.sprintRepository.find();
  }

  findByManagerId(managerId: number) {
    return this.sprintRepository.find({
      where: { createdBy: { id: managerId } },
      order: { createdAt: 'DESC' },
    });
  }
  findOne(id: number) {
    return this.sprintRepository.findOne({ where: { id } });
  }

  update(id: number, updateSprintDto: UpdateSprintDto) {
    return this.sprintRepository.update(id, updateSprintDto);
  }

  remove(id: number) {
    return this.sprintRepository.delete(id);
  }
}
