import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
// locals
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';

@ApiTags('user')
@Controller({ path: 'user', version: ['1'] })
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  public createUser(@Body() body: CreateUserDto): Promise<User | undefined> {
    return this.service.createUser(body);
  }
}
