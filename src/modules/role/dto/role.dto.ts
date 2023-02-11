import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { MappedWithEntity } from '../../../common/lib/type/mapper.types';
import { Role } from '../entity/role.entity';
import { Mapped } from 'src/common/lib/decorator/map.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class AddUserToRoleDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class UserOutputDto implements MappedWithEntity<User> {
  @Mapped() name: string;
}

export class RoleOutputDto implements MappedWithEntity<Role> {
  @Mapped() title: string;

  @Mapped(() => UserOutputDto)
  @ValidateNested({ each: true })
  @Type(() => UserOutputDto)
  users: UserOutputDto[];
}
