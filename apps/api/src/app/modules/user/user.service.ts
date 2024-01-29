import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@mifiware-tfm/entity-data-models';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>
  ) {}
  /* async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.findByUsername(createUserDto.username);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const user = new User();
    user.name = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  async validateUser(userValidation: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(userValidation.username);
    if (!user || user.password != userValidation.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  } */

  findByUsername(name: string): Promise<User> {
    return this.usersRepository.findOne({ where: { name } });
  }

  async findById(uuid: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
