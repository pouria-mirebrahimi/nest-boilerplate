import { Module } from '@nestjs/common';
// controller
import { UserController } from './controller/user.controller';
// service
import { UserService } from './service/user.service';
// repository
import { UserRepository } from './repository/user.repository';
import { UserViewRepository } from './repository/user.view.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserViewRepository],
})
export class UserModule {}
