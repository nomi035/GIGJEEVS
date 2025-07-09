import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateDiscussionDto {
  @ApiProperty()
 title:string;
 @ApiProperty()
 description:string;
discussionBy:User
}
