import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'The password of account user' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the role of new user' })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
