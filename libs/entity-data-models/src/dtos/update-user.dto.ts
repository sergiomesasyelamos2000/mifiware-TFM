import { IsEmail, IsOptional, IsString, IsEnum, IsUrl } from 'class-validator';
import { Role } from '../enums';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly photoUrl?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly surname?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;

  @IsOptional()
  @IsString()
  readonly password?: string;

  constructor() {
    this.photoUrl = null;
    this.name = null;
    this.surname = null;
    this.email = null;
    this.role = null;
    this.password = null;
  }
}
