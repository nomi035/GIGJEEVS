import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "src/tasks/entities/task.entity";
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
        teamMembers?: User[];
        @ApiProperty({default:"INPROGRESS"})
        status?: TaskStatus; // Assuming status is a string, adjust as necessary

}
