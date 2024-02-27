import {
  JwtPayload,
  JwtTokenDto,
  LogInDto,
  Role,
  SignUpDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import {
  AUTH_ERROR_EMAIL_ALREADY_EXISTS,
  AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID,
} from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /* Register a new user */

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const email = signUpDto.email ? signUpDto.email.trim() : null;
    let password = signUpDto.password ? signUpDto.password.trim() : null;
    let user: User = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictException(AUTH_ERROR_EMAIL_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser: User = {
      name: signUpDto.name,
      surname: signUpDto.surname,
      email: email,
      password: password,
      role: Role.USER,
    };

    user = await this.usersRepository.save(newUser);
  }

  /* Login user */

  async login(logInDto: LogInDto): Promise<JwtTokenDto> {
    const email = logInDto.email ? logInDto.email.trim() : null;
    const password = logInDto.password ? logInDto.password.trim() : null;

    const user: User = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    console.log('login', password, user.password, isPasswordValid);

    if (!isPasswordValid) {
      throw new NotFoundException(AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID);
    }
    return this.createJwtToken(user.uuid, { id: user.uuid, date: new Date() });
  }

  /* Create a new session */
  private createJwtToken(id: string, jwtPayload: JwtPayload): JwtTokenDto {
    return {
      accessToken: this.generateJwtToken(
        jwtPayload,
        environment.auth.accessToken.secretKey,
        environment.auth.accessToken.expiresIn
      ),
      refreshToken: this.generateJwtToken(
        jwtPayload,
        environment.auth.refreshToken.secretKey,
        environment.auth.refreshToken.expiresIn
      ),
      tokenType: environment.auth.tokenType,
      userId: id,
    };
  }
  /* Create a new JWT Token */
  private generateJwtToken(
    jwtPayload: JwtPayload,
    jwtSecretKey: string,
    jwtExpireTime: number
  ): string {
    return this.jwtService.sign(jwtPayload, {
      secret: jwtSecretKey,
      expiresIn: jwtExpireTime,
    });
  }
}
