import { Module } from '@nestjs/common';
// controller
import { UserController } from './controller/user.controller';
import { UserSseController } from './controller/user.sse.controller';
// service
import { UserService } from './service/user.service';
import { UserSseService } from './service/user.sse.service';
// repository
import { UserRepository } from './repository/user.repository';
import { UserViewRepository } from './repository/user.view.repository';

@Module({
  imports: [],
  controllers: [UserController, UserSseController],
  providers: [UserService, UserSseService, UserRepository, UserViewRepository],
})
export class UserModule {}
