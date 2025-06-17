import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    // Import TypeOrmModule with Task entity if needed
    TypeOrmModule.forFeature([Task]),
  ],
})
export class TasksModule {}
