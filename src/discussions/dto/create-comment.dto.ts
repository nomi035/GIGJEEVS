import { ApiProperty } from '@nestjs/swagger';
import { Discussion } from '../entities/discussion.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateCommentDto {
  @ApiProperty()
  comment: string;

  commentedBy: User;

  @ApiProperty({
    description: 'ID of the discussion the comment belongs to',
    type: Number,
    required: true,
  })
  discussion: Discussion;
}
