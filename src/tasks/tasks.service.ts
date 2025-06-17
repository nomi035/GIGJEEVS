import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {
    // This constructor injects the Task repository for database operations
  }
  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find({
      relations: ['taskFor', 'taskOf'], // Include related entities
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['taskFor', 'taskOf'],
    });
    // This method retrieves a task by its ID, including related entities
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
  async findAllTasksForUser(taskSearchDto: { userId: number; projectId: number }) {
    const { userId, projectId } = taskSearchDto;
    return this.tasksRepository.find({
      where: {
        taskFor: { id: userId },
        taskOf: { id: projectId },
      },
      relations: ['taskFor', 'taskOf'],
      order:{
        createdAt: 'DESC', // Order by creation date, descending
      } // Include related entities
    });
  }
}
