import { Module } from '@nestjs/common';
// controller
import { UserController } from './controller/user.controller';
import { UserSseController } from './controller/user.sse.controller';
// service
import { UserService } from './service/user.service';
import { UserSseService } from './service/user.sse.service';
import { AuthService } from '../auth/service/auth.service';
// repository
import { UserRepository } from './repository/user.repository';
import { UserViewRepository } from './repository/user.view.repository';
// event
import { UserEventGateway } from './event/user.gateway';

@Module({
  imports: [],
  controllers: [UserController, UserSseController],
  providers: [
    // Service
    UserService,
    UserSseService,
    AuthService,
    // Repository
    UserRepository,
    UserViewRepository,
    // Event
    UserEventGateway,
  ],
})
export class UserModule {}
