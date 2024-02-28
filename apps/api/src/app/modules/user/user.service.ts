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
    const userExist = await this.findByUsername(createUserDto.name);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    console.log('entra en create api', createUserDto.photoUrl);

    const newPost = await this.usersRepository.save({
      photoUrl:
        createUserDto.photoUrl ||
        'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      role: createUserDto.role,
      password: createUserDto.password,
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
}
