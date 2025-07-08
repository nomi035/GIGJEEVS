import { ApiProperty } from "@nestjs/swagger";

export class CreateDiscussionDto {
@ApiProperty()
    title: string;
@ApiProperty()
    description: string;
}
