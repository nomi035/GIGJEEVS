import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';

@Module({
  controllers: [SprintController],
  providers: [SprintService],
  imports: [TypeOrmModule.forFeature([Sprint])],
})
export class SprintModule {}
