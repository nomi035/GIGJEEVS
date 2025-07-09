import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { Comments } from './entities/comments.entity';

@Module({
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  imports:[TypeOrmModule.forFeature([Discussion, Comments])],
})
export class DiscussionsModule {}
