import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports:[TypeOrmModule.forFeature([Project]),UserModule], // Add your entities here
})
export class ProjectsModule {}
