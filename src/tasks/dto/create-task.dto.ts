import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;


  status?: TaskStatus;

  @ApiProperty({
    description: 'ID of the user the task is assigned to',
    type: Number,
    required: true,
  })
  taskFor: User;

  @ApiProperty({
    description: 'ID of the project the task belongs to',
    type: Number,
    required: true,
  })
  taskOf: Project;
}

export class taskSearchDto{
    @ApiProperty()
    userId:number
    @ApiProperty()
    projectId:number
}
