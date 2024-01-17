import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.findByUsername(createUserDto.username);

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  async validateUser(userValidation: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(userValidation.username);
    if (!user || user.password != userValidation.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
