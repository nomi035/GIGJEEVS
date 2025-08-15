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
export class SignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private signalingService: SignalingService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const disconnectedClientInfo =
      this.signalingService.getClientBySid(client.id);
    const result = this.signalingService.removeClientBySid(client.id);

    if (result && disconnectedClientInfo) {
      // Notify remaining users that someone has left
      this.server
        .to(result.roomId)
        .emit('userDisconnected', { name: result.removed.name });

      // If the disconnected user was sharing their screen, notify everyone
      if (disconnectedClientInfo.wasSharingScreen) {
        this.server.to(result.roomId).emit('screenShareStatus', {
          name: result.removed.name,
          isSharing: false,
        });
      }
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { roomID, name } = data;

    // your existing name check and user prep logic
    const existingUsers = this.signalingService.getClientsInRoom(roomID);
    if (existingUsers.some((u) => u.name === name)) {
      return { error: `Name '${name}' is already taken.` };
    }

    const clientObj = { roomID, name, sid: client.id };
    this.signalingService.addClientToRoom(roomID, clientObj);
    client.join(roomID);
    
    // Notify all OTHER clients in the room that a new peer has joined.
    // They will be responsible for initiating the connection.
    client.to(roomID).emit('newUserJoined', { name: clientObj.name });

    // Prepare the acknowledgment for the new joiner.
    const screenSharerName = this.signalingService.getScreenSharer(roomID);
    const usersForAck = existingUsers.map((user) => ({
      name: user.name,
      isSharingScreen: user.name === screenSharerName,
    }));

    // Send the list of existing users to the new joiner so they know who to expect offers from.
    return { existingUsers: usersForAck };
  }

  @SubscribeMessage('sendOffer')
  handleSendOffer(@MessageBody() data: any) {
    const { roomID, senderName, targetName, offer } = data;
    const target = this.signalingService.getClientByName(roomID, targetName);
    if (target) {
      this.server.to(target.sid).emit('receiveOffer', { offer, senderName });
    }
  }

  @SubscribeMessage('sendAnswer')
  handleSendAnswer(@MessageBody() data: any) {
    const { roomID, senderName, receiverName, answer } = data;
    const target = this.signalingService.getClientByName(roomID, receiverName);
    if (target) {
      this.server.to(target.sid).emit('receiveAnswer', { answer, senderName });
    }
  }

  @SubscribeMessage('sendIceCandidate')
  handleICE(@MessageBody() data: any) {
    const { roomID, senderName, targetName, candidate } = data;
    const target = this.signalingService.getClientByName(roomID, targetName);
    if (target) {
      this.server
        .to(target.sid)
        .emit('receiveIceCandidate', { candidate, senderName });
    }
  }

  @SubscribeMessage('sendScreenOffer')
  handleSendScreenOffer(@MessageBody() data: any) {
    const { roomID, senderName, targetName, offer } = data;
    const target = this.signalingService.getClientByName(roomID, targetName);
    if (target) {
      this.server
        .to(target.sid)
        .emit('receiveScreenOffer', { offer, senderName });
    }
  }

  @SubscribeMessage('sendScreenAnswer')
  handleSendScreenAnswer(@MessageBody() data: any) {
    const { roomID, senderName, receiverName, answer } = data;
    const target = this.signalingService.getClientByName(roomID, receiverName);
    if (target) {
      this.server
        .to(target.sid)
        .emit('receiveScreenAnswer', { answer, senderName });
    }
  }

  @SubscribeMessage('sendScreenIceCandidate')
  handleScreenICE(@MessageBody() data: any) {
    const { roomID, senderName, targetName, candidate } = data;
    const target = this.signalingService.getClientByName(roomID, targetName);
    if (target) {
      this.server
        .to(target.sid)
        .emit('receiveScreenIceCandidate', { candidate, senderName });
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

  @SubscribeMessage('startScreenShare')
  handleStartScreenShare(@MessageBody() data: { roomID: string; name: string }) {
    // Only allow one sharer at a time
    if (!this.signalingService.getScreenSharer(data.roomID)) {
      this.signalingService.setScreenSharer(data.roomID, data.name);
      this.server.to(data.roomID).emit('screenShareStatus', {
        name: data.name,
        isSharing: true,
      });
    }
  }

  @SubscribeMessage('stopScreenShare')
  handleStopScreenShare(@MessageBody() data: { roomID: string; name: string }) {
    this.signalingService.clearScreenSharer(data.roomID);
    this.server.to(data.roomID).emit('screenShareStatus', {
      name: data.name,
      isSharing: false,
    });
  }
}