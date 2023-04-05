import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
// abstract gateway class
import { AbsEventGateway } from '../../../common/lib/gateway/gateway';
import { WebSocketEventEnum } from '../../../common/lib/enum/event.enum';
import { UserViewRepository } from '../repository/user.view.repository';
import { UseGuard } from '../../../common/lib/decorator/guard.decorator';
import { JWTAccessAuthGuard } from '../../auth/guard/jwt/auth.guard';
import { User } from '../../../common/lib/decorator/user.decorator';
import { Req } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'user/event',
  cors: { origin: '*' },
})
export class UserEventGateway extends AbsEventGateway {
  @InjectRepository(UserViewRepository)
  private readonly userRepo: UserViewRepository;

  @UseGuard(JWTAccessAuthGuard)
  @SubscribeMessage(WebSocketEventEnum.TEST)
  async onTest(
    @ConnectedSocket() client: any,
    @MessageBody() data: string | object,
  ): Promise<string> {
    console.log(client.conn.user);
    // const found = await this.userRepo.queryAllEntities();
    // console.log(found);

    // console.log(client.id);
    // console.log(client.handshake.query?.deviceId?.toString());
    // console.log(client.handshake.query?.lessonId?.toString());
    return `data: ${data}`;
  }
}
