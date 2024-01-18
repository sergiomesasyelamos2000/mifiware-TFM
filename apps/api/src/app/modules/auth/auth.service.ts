import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { User } from '../../shared/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(user: User) {
    const payload = {
      sub: user.uuid,
      username: user.username,
      role: user.role,
    };

    const secretKey = environment.secretKey;

    if (!secretKey) {
      throw new Error('No se ha proporcionado una clave secreta para JWT');
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  validateUser(payload: any): Promise<User> {
    return this.userService.findByUsername(payload.username);
  }
}
