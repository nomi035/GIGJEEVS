import { PartialType } from "@nestjs/mapped-types";
import { CreatOrganizationDto } from "./create-organization.dto";

export class UpdateOrganizationDto extends PartialType(CreatOrganizationDto) {

  // due to the use of PartialType from @nestjs/mapped-types.
  // No additional properties are needed here.

}