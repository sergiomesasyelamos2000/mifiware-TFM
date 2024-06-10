import {
  CreateUserDto,
  Role,
  UpdateUserDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
//import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { AUTH_ERROR_EMAIL_ALREADY_EXISTS } from '../auth/auth.constants';
import environment from './../../../environments/environment';
import { LocationUser } from './entities/location-user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) /* @InjectModel(LocationUser.name) */
  /* private locationUserModel: Model<any> */
  {}

  /*  async onModuleInit() {
    await this.getAllUsers();
  } */

  /* async getAllUsers(): Promise<string[]> {
    const users = await this.locationUserModel
      .find(
        { '_id.type': 'LocationUser' }, // consulta
        { 'attrs.user_id.value': 1, _id: 0 } // proyección
      )
      .exec();

    const userIds = users.map((user) => user.attrs.get('user_id').value);

    const uniqueUserIds = [...new Set(userIds)];

    // Guardar los user_id únicos en la base de datos MySQL
    for (const userId of uniqueUserIds) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('defaultpassword' + userId, salt);
      const newUser = this.usersRepository.create({
        uuid: userId,
        name: 'Default name' + userId,
        surname: 'Default surname' + userId,
        email: userId + '@example.com',
        password: password,
        role: Role.USER,
      });
      await this.usersRepository.save(newUser);
    }

    return uniqueUserIds;
  } */

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

  getGrafanaUrlBinary(user: User): string {
    console.log('entra en getGrafanaUrl API', user);
    const userId = 'A';

    // Determina si el usuario es administrador
    const isAdmin = user.role === Role.SUPER_ADMIN;
    if (isAdmin) {
      return `http://localhost:3003/d/fdez2ki4icmpsc/sensores-binarios?orgId=1&from=1704063600000&to=1735685999999&kiosk=tv`;
    } else {
      return `http://localhost:3003/d/fdez2ki4icmpsc/sensores-binarios?orgId=1&from=1704063600000&to=1735685999999&kiosk`;
    }
  }

  getGrafanaUrlLocation(user: User): string {
    console.log('entra en getGrafanaUrl API', user);
    const userId = 'A';

    // Determina si el usuario es administrador
    const isAdmin = user.role === Role.SUPER_ADMIN;
    if (isAdmin) {
      return `http://localhost:3003/d/a755de72-d8b9-42a8-86d4-53b2d2c378a3/sensores-de-localizacion?orgId=1&var-user_id=All&from=1704063600000&to=1735685999999&`;
    } else {
      return `http://localhost:3003/d/a755de72-d8b9-42a8-86d4-53b2d2c378a3/sensores-de-localizacion?orgId=1&var-user_id=${userId}&from=1704063600000&to=1735685999999&kiosk`;
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
