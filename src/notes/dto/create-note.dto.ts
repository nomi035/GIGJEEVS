import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateNoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  createdBy: User;
}
