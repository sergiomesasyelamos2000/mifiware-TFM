import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';

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
