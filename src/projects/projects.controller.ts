import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { currentUser } from 'src/decorators/currentUser';
import { JwtAuthGuard } from 'src/auth/guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@ApiBearerAuth()
@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService,
    private readonly userService:UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto,@currentUser() user: any) {
    return this.projectsService.create({
      ...createProjectDto,organization:user.organization});
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
  @Get('/organization/:organizationId')
  findByOrganizationId(@Param('organizationId') organizationId: string) {
    return this.projectsService.findByOrganizationId(+organizationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/manager/all')
  findByManagerId(@currentUser() user: any) {
    return this.projectsService.findByManagerId(user.userId);
  }

    @UseGuards(JwtAuthGuard)
  @Get('/employee/all')
  findByEmployeeId(@currentUser() user: any) {
    return this.projectsService.findByEmployeeId(user.userId);
  }

   @Patch('/team/:id')
  async addTeam(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const teamMembers = await this.userService.findByIds(updateProjectDto.teamMembers)
    return await this.projectsService.addTeam(+id,teamMembers);
    // const project = await this.projectsService.findOne(+id);
    // project.teamMembers = teamMembers;
    // return this.(project);
    // return this.projectsService.update(+id,{...updateProjectDto, teamMembers });

  }

}
