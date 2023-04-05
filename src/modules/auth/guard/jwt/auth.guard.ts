import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAccessAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient();
    ws.conn.user = { id: 2 };
    const bearerToken = ws.handshake.headers?.authorization;
    const headers = {
      headers: {
        authorization: bearerToken,
      },
    };
    return headers;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
