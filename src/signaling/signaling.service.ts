// signaling.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignalingService {
  connectedClients = new Map<string, any[]>();

  getClientsInRoom(roomId: string): any[] {
    return this.connectedClients.get(roomId) || [];
  }

  addClientToRoom(roomId: string, client: any) {
    const clients = this.getClientsInRoom(roomId);
    clients.push(client);
    this.connectedClients.set(roomId, clients);
  }

  removeClientBySid(sid: string) {
    for (const [roomId, clients] of this.connectedClients.entries()) {
      const idx = clients.findIndex((c) => c.sid === sid);
      if (idx !== -1) {
        const [removed] = clients.splice(idx, 1);
        if (clients.length === 0) {
          this.connectedClients.delete(roomId);
        } else {
          this.connectedClients.set(roomId, clients);
        }
        return { roomId, removed, remainingClients: clients };
      }
    }
    return null;
  }
}
