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
import { Users } from '../entity/users.entity';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/users.dto';

@ApiTags('user')
@Controller({ path: 'user', version: ['1'] })
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return this.service.getUserById(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  public createUser(@Body() body: CreateUserDto): Promise<Users | undefined> {
    return this.service.createUser(body);
  }
}
