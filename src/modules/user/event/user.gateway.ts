import { WebSocketGateway } from '@nestjs/websockets';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
// abstract gateway class
import { AbsEventGateway } from '../../../common/lib/gateway/gateway';
import { WebSocketEventEnum } from '../../../common/lib/enum/event.enum';

@WebSocketGateway({
  namespace: 'user/event',
  cors: { origin: '*' },
})
export class UserEventGateway extends AbsEventGateway {
  @SubscribeMessage(WebSocketEventEnum.TEST)
  async onTest(@MessageBody() data: string | object): Promise<string> {
    return `data: ${data}`;
  }
}
