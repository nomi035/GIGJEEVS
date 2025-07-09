import { Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discussion } from './entities/discussion.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { updateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comments.entity';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {
    // This constructor injects the Discussion repository for database operations
  }
  create(createDiscussionDto: CreateDiscussionDto) {
    return this.discussionRepository.save(createDiscussionDto);
  }

  findAll() {
    return this.discussionRepository.find({
      relations: ['comments'], // Include related comments
    });
    // This method retrieves all discussions, including their comments
  }

  findOne(id: number) {
    return this.discussionRepository.findOne({
      where: { id },
      relations: ['comments'], // Include related comments
    });
    // This method retrieves a discussion by its ID, including its comments
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionRepository.update(id, updateDiscussionDto);
  }

  remove(id: number) {
    return this.discussionRepository.delete(id);
  }

   createComment(createCommentDto: CreateCommentDto) {

    return this.commentRepository.save(createCommentDto);
  }

  findAllComments(id:number) {
    return this.commentRepository.find({
      where: { discussion:{id} },
      relations: ['commentedBy'],
      // Include related comments
      order:{ createdAt: 'DESC', // Order by creation date, descending
      },
    });
    // This method retrieves all discussions, including their comments
  }

    // This method retrieves a discussion by its ID, including its comments


  updateComment(id: number, updateDiscussionDto: updateCommentDto) {
    return this.commentRepository.update(id, updateDiscussionDto);
  }

  removeComment(id: number) {
    return this.discussionRepository.delete(id);
  }
}
