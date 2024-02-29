import { Column } from 'typeorm';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @Column({ type: 'varchar' })
  password: string;

  constructor() {
    this.photoUrl = null;
    this.name = null;
    this.surname = null;
    this.email = null;
    this.password = null;
    this.role = null;
  }
}
