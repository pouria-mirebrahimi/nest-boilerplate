import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// locals
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { Users } from './entity/users.entity';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
