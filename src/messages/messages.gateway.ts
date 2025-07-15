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

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust for production
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService:UserService){
  
  }
  private users: Record<string, string> = {};
 
  

  async handleConnection(client: Socket) {
    const socketId:string=client.id
    console.log(`Client connected: ${client.id}`,typeof(socketId));
    const userId = client.handshake.auth.userId;
    const user=await this.userService.updateSocketId(client.id,userId)
    const updatedUser = await this.userService.findOne(userId)
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
    client.broadcast.emit('userJoined', username);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const username = this.users[client.id] || 'Anonymous';
    const payload = { message: data.message, username };
    client.broadcast.emit('message', payload);
    console.log("message",payload)
    client.emit('message', payload); // Send back to sender too
  }
}
