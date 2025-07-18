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
    return this.messageRepository.find();
  }

  findbysender(senderId:number,receiverId:number){
    return this.messageRepository.find({
      where: [
      {
        sendBy: { id: senderId },
        receivedBy: { id: receiverId },
      },
      {
        sendBy: { id: receiverId },
        receivedBy: { id: senderId },
      },
    ],

      relations: ['sendBy', 'receivedBy'],
      select: {sendBy:{name:true,id:true},receivedBy:{name:true,id:true},id:true,messageBody:true,createdAt:true,updatedAt:true,isActive:true},

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
