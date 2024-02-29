import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  Role,
  UpdateUserDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import { AUTH_ERROR_EMAIL_ALREADY_EXISTS } from '../auth/auth.constants';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import environment from './../../../environments/environment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  /* 

  async validateUser(userValidation: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(userValidation.username);
    if (!user || user.password != userValidation.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  } */

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email ? createUserDto.email.trim() : null;
    let password = createUserDto.password
      ? createUserDto.password.trim()
      : null;
    const user: User = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException(AUTH_ERROR_EMAIL_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    if (!createUserDto.photoUrl) {
      const imageBuffer = fs.readFileSync(environment.photoBase64.dirname);
      const imageBase64 = imageBuffer.toString('base64');

      createUserDto.photoUrl = 'data:image/png;base64,' + imageBase64;
    }

    const newPost = await this.usersRepository.save({
      photoUrl: createUserDto.photoUrl,
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: email,
      role: createUserDto.role,
      password: password,
    });
    return newPost;
  }

  async findByUsername(name: string): Promise<User> {
    return this.usersRepository.findOne({ where: { name } });
  }

  async findById(uuid: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(uuid: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User #${uuid} not found`);
    }
    const updateUser = Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(updateUser);

    delete updatedUser.password;

    return updatedUser;
  }

  async delete(uuid: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User #${uuid} not found`);
    }
    await this.usersRepository.remove(user);
  }

  async bulkDelete(users: User[]): Promise<void> {
    await this.usersRepository.remove(users);
  }

  getGrafanaUrl(user: User): string {
    console.log('entra en getGrafanaUrl API', user);
    const userId = 'A';

    // Determina si el usuario es administrador
    const isAdmin = user.role === Role.SUPER_ADMIN;
    if (isAdmin) {
      return `http://localhost:3003/d/a755de72-d8b9-42a8-86d4-53b2d2c378a4/sensores-de-localizacion?orgId=1&from=1707636483388&to=1707658083388&kiosk=tv`;
    } else {
      return `http://localhost:3003/d/a755de72-d8b9-42a8-86d4-53b2d2c378a4/sensores-de-localizacion?orgId=1&var-user_id=${userId}&from=1707636483388&to=1707658083388&kiosk`;
    }
  }

  /* Método findAll con paginación */
  //skip es el número de registros que queremos saltar
  //take es el número de registros que queremos tomar

  /* async findAllPagination(
    skip = 0,
    take = 10
  ): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: skip,
      take: take,
    });

    return { data, total };
  } */
}
