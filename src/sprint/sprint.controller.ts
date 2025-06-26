import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorators/currentUser';

@ApiTags('Sprint')
@ApiBearerAuth()
@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSprintDto: CreateSprintDto, @currentUser() user: any) {
    return this.sprintService.create({
      ...createSprintDto,
      createdBy: user.userId,
    });
  }

  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/manager/all')
  findSprintByManager(@currentUser() user: any) {
    return this.sprintService.findByManagerId(user.userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sprintService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
    return this.sprintService.update(+id, updateSprintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sprintService.remove(+id);
  }
}
