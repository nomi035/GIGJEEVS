import { ApiProperty } from "@nestjs/swagger";

export class CreatOrganizationDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    number: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    email: string;
}