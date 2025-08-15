// signaling.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignalingService {
  // Maps roomId to an array of client objects { roomID, name, sid }
  private connectedClients = new Map<string, any[]>();
  // Maps roomId to the name of the user who is sharing their screen
  private screenSharers = new Map<string, string>();

  getClientsInRoom(roomId: string): any[] {
    return this.connectedClients.get(roomId) || [];
  }

  // Finds a client in a specific room by their name.
  getClientByName(roomId: string, name: string): any | undefined {
    const clients = this.getClientsInRoom(roomId);
    return clients.find((c) => c.name === name);
  }

  // NEW: Finds a client across all rooms by their socket ID.
  getClientBySid(sid: string): { client: any; wasSharingScreen: boolean } | null {
    for (const [roomId, clients] of this.connectedClients.entries()) {
      const client = clients.find((c) => c.sid === sid);
      if (client) {
        const wasSharingScreen = this.getScreenSharer(roomId) === client.name;
        return { client, wasSharingScreen };
      }
    }
    return null;
  }

  addClientToRoom(roomId: string, client: any) {
    const clients = this.getClientsInRoom(roomId);
    clients.push(client);
    this.connectedClients.set(roomId, clients);
  }

  removeClientBySid(sid: string) {
    for (const [roomId, clients] of this.connectedClients.entries()) {
      const index = clients.findIndex((c) => c.sid === sid);
      if (index !== -1) {
        const [removed] = clients.splice(index, 1);

        // If the removed client was the screen sharer, clear them
        if (this.getScreenSharer(roomId) === removed.name) {
          this.clearScreenSharer(roomId);
        }

        // If the room is now empty, delete it
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

  setScreenSharer(roomId: string, userName: string) {
    this.screenSharers.set(roomId, userName);
  }

  getScreenSharer(roomId: string): string | undefined {
    return this.screenSharers.get(roomId);
  }

  clearScreenSharer(roomId: string) {
    this.screenSharers.delete(roomId);
  }
}