import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard';
import { currentUser } from 'src/decorators/currentUser';

@ApiBearerAuth()
@ApiTags('Discussions')
@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDiscussionDto: CreateDiscussionDto,@currentUser() user: any) {
    return this.discussionsService.create({...createDiscussionDto,discussionBy:user.userId});
  }

  @Get()
  findAll() {
    return this.discussionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionsService.update(+id, updateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionsService.remove(+id);
  }

   @Post('comment')
  @UseGuards(JwtAuthGuard)
  createComment(@Body() createDiscussionDto: CreateCommentDto,@currentUser() user: any){
    return this.discussionsService.createComment({...createDiscussionDto,commentedBy:user.userId});
  }

  @Get('/comment/for/:id')
  findAllComments(@Param('id')id: string) {
    return this.discussionsService.findAllComments(+id);
  }



  @Patch('/comment/:id')
  updateComment(@Param('id') id: string, @Body() updateDiscussionDto: updateCommentDto) {
    return this.discussionsService.updateComment(+id, updateDiscussionDto);
  }

  @Delete('/comment:id')
  removeComment(@Param('id') id: string) {
    return this.discussionsService.removeComment(+id);
  }
}
