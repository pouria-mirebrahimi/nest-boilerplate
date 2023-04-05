import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
// abstract gateway class
import { AbsEventGateway } from '../../../common/lib/gateway/gateway';
// enum
import { WebSocketEventEnum } from '../../../common/lib/enum/event.enum';
// repository
import { UserViewRepository } from '../repository/user.view.repository';
// decorator
import { UseGuard } from '../../../common/lib/decorator/guard.decorator';
// guard
import { JWTWebsocketAuthGuard } from '../../auth/guard/jwt/auth.ws.guard';

@WebSocketGateway({
  namespace: 'user/event',
  cors: { origin: '*' },
})
export class UserEventGateway extends AbsEventGateway {
  @InjectRepository(UserViewRepository)
  private readonly userRepo: UserViewRepository;

  @UseGuard(JWTWebsocketAuthGuard)
  @SubscribeMessage(WebSocketEventEnum.TEST)
  async onTest(
    @ConnectedSocket() client: any,
    @MessageBody() data: string | object,
  ): Promise<string> {
    console.log('onTest', client.conn.user);
    // const found = await this.userRepo.queryAllEntities();
    // console.log(found);

    // console.log(client.id);
    // console.log(client.handshake.query?.deviceId?.toString());
    // console.log(client.handshake.query?.lessonId?.toString());
    return `data: ${data}`;
  }
}
