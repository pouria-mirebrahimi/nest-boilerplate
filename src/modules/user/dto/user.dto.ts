import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    type: Number,
  })
  @IsEmail()
  public email: string;
}

export class AddRoleDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
