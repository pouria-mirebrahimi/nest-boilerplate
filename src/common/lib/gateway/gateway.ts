import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
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

  private handleConnection(@ConnectedSocket() client: any): void {
    // console.log(client.id);
    // console.log(client.conn);
    // console.log(client.handshake.query?.deviceId?.toString());
    // console.log(client.handshake.query?.lessonId?.toString());
    this.wsClients.push(client);
  }

  private handleDisconnect(@ConnectedSocket() client: Socket): void {
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
