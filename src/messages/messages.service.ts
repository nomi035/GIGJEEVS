import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>) {}


  create(createMessageDto: CreateMessageDto) {
    return this.messageRepository.save(createMessageDto);
  }

  findAll() {
    return `This action returns all messages`;
  }

  findbysender(senderId:number,receiverId:number){
    return this.messageRepository.find({
      where: {
        sendBy: { id: senderId },
        receivedBy: { id: receiverId },
      },
      order: {
        createdAt: 'DESC',
      },
    });
     }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return this.messageRepository.delete(id)
  }
}
