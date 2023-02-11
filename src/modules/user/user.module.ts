import { Module } from '@nestjs/common';
// controller
import { UserController } from './controller/user.controller';
// service
import { UserService } from './service/user.service';
// repository
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
