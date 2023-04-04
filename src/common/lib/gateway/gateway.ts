import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// enum
import { WebSocketEventEnum } from '../enum/event.enum';

export abstract class AbsEventGateway {
  @WebSocketServer()
  private readonly server: Server;
  public readonly wsClients: Array<Socket> = [];

  private afterInit(): void {
    this.server.emit(WebSocketEventEnum.INITIALIZE, { do: null });
  }

  private handleConnection(client: Socket): void {
    this.wsClients.push(client);
  }

  private handleDisconnect(client: Socket): void {
    const clientId = client.id;
    const index = this.wsClients.findIndex((c) => c.id === clientId);
    this.wsClients.splice(index, 1);
    // this.broadcast(WebSocketEventEnum.DISCONNECT, { id: clientId });
  }

  broadcast(event: string, data: string | object): void {
    const message = JSON.stringify(data);
    this.wsClients.forEach((client) => client.emit(event, message));
  }
}
