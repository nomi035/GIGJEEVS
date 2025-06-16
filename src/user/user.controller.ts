import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserSwaggerSchema } from './user.swagger-schema';
import { JwtAuthGuard } from 'src/auth/guard';
import { CreatOrganizationDto } from './dto/create-organization.dto';
import { Role } from './entities/user.entity';


@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/Organization')
  async createOrganization(@Body() createOrganizatinDto:CreatOrganizationDto) {
    return this.userService.createOrganization(createOrganizatinDto);
  }

  @Get('/Organization')
  async getAllOrganizations() {
    return this.userService.getAllOrganizations();
  }
  @Get('/Organization/:id')
  async getOrganizationById(@Param('id') id: number) {
    return this.userService.getOrganizationById(id);
  }
  @Patch('/Organization/:id')
  async updateOrganization(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateOrganization(id, updateUserDto);
  }
  @Delete('/Organization/:id')
  async removeOrganization(@Param('id') id: number) {
    return this.userService.removeOrganization(id);
  }

  @ApiBody(UserSwaggerSchema.createUserBody)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.userService.findByEmail(createUserDto.email);
    console.log("i am user",userExists)
    if(userExists)
      throw new HttpException('User already exists', 400);
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)

  @Get()
  findAll(@Query('role') role: Role) {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
