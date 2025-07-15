import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [MessagesGateway, MessagesService],
  imports:[UserModule]
})
export class MessagesModule {}
