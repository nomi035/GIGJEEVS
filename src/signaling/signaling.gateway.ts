// signaling.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SignalingService } from './signaling.service';

@WebSocketGateway({ cors: true, namespace: 'signaling' })
export class SignalingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private signalingService: SignalingService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const result = this.signalingService.removeClientBySid(client.id);
    if (result) {
      this.server.to(result.roomId).emit('userDisconnected', {
        name: result.removed.name,
        remainingUsers: result.remainingClients.length,
      });
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { roomID, name } = data;

    const existing = this.signalingService.getClientsInRoom(roomID);
    const clientObj = { roomID, name, sid: client.id };

    if (existing.some((u) => u.name === name)) {
      return { sameName: true, existingName: name };
    }

    this.signalingService.addClientToRoom(roomID, clientObj);
    client.join(roomID);

    return {
      isFirstInTheCall: existing.length === 0,
      membersOnCall: existing.length + 1,
      existingUsers: existing.map((u) => u.name),
    };
  }

  @SubscribeMessage('sendOffer')
  handleSendOffer(@MessageBody() data: any) {
    const { roomID, senderName, targetName, offer } = data;
    const clients = this.signalingService.getClientsInRoom(roomID);
    const target = clients.find((c) => c.name === targetName);
    if (target) {
      this.server.to(target.sid).emit('receiveOffer', { offer, senderName });
    }
  }

  @SubscribeMessage('sendAnswer')
  handleSendAnswer(@MessageBody() data: any) {
    const { roomID, senderName, receiverName, answer } = data;
    const clients = this.signalingService.getClientsInRoom(roomID);
    const target = clients.find((c) => c.name === receiverName);
    if (target) {
      this.server.to(target.sid).emit('receiveAnswer', { answer, senderName });
    }
  }

  @SubscribeMessage('sendIceCandidate')
  handleICE(@MessageBody() data: any) {
    const { roomID, senderName, targetName, candidate } = data;
    const clients = this.signalingService.getClientsInRoom(roomID);
    const target = clients.find((c) => c.name === targetName);
    if (target) {
      this.server.to(target.sid).emit('receiveIceCandidate', { candidate, senderName });
    }
  }

  @SubscribeMessage('mediaStateChange')
  handleMediaStateChange(@MessageBody() data: any) {
    this.server.to(data.roomID).emit('mediaStateChanged', {
      userName: data.userName,
      enabled: data.enabled,
      mediaType: data.mediaType,
    });
  }
}
