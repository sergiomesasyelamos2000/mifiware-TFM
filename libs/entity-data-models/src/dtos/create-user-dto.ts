import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  constructor() {
    this.name = null;
    this.surname = null;
    this.email = null;
    this.password = null;
  }
}
