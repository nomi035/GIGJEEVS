import { ApiProperty } from "@nestjs/swagger";
import { Organization } from "src/user/entities/organization.entity";
import { User } from "src/user/entities/user.entity";

export class CreateProjectDto {
        @ApiProperty()
        name: string;
       @ApiProperty()
        description: string;
        @ApiProperty()
        startDate?: Date;
        @ApiProperty()
        endDate?: Date;
        organization:Organization
        manager?:User
}
