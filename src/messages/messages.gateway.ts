// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { clearConfigCache } from 'prettier';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust for production
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly userService: UserService,
    private readonly messagesService: MessagesService
  ) {}
  private users: Record<string, string> = {};

  async handleConnection(client: Socket) {
    const socketId: string = client.id;
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.auth.userId;
    const user = await this.userService.updateSocketId(client.id, userId);
    const updatedUser = await this.userService.findOne(userId);
    // console.log(updatedUser)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.users[client.id];
  }

  @SubscribeMessage('setUsername')
  handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.users[client.id] = username;
    console.log('the usernamme is', username);
    client.broadcast.emit('userJoined', username);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: { message: string; senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const payload = {
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
    };
    const sender=await this.userService.findOne(+data.senderId);
    const receiver=await this.userService.findOne(+data.receiverId);
    const messageSaved = await this.messagesService.create({
      messageBody: data.message,
      sendBy: sender,
      receivedBy: receiver,
    });

    // client.broadcast.emit('message', payload);
    client.to(receiver.socketId).emit('message', payload);

    // client.emit('message', payload); // Send back to sender too


  }
}
