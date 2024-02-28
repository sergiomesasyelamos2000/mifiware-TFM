import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Role } from '../enums/role.enum';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname?: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({
    type: 'enum',
    enum: Role,
    name: 'role',
  })
  role: Role;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  photoUrl?: string;

  constructor() {
    this.name = null;
    this.password = null;
    this.role = null;
    this.photoUrl =
      'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  }
}
