import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty()
    senderId?: number;
    @ApiProperty()
    receiverId?: number;
}
