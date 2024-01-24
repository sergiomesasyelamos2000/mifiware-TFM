import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { IsEmail } from 'class-validator';

export class LogInDto {
  @Column({ type: 'varchar' })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  constructor() {
    this.email = null;
    this.password = null;
  }
}
