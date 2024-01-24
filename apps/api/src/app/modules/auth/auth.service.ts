import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  JwtPayload,
  JwtTokenDto,
  LogInDto,
  Role,
  SignUpDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import {
  AUTH_ERROR_EMAIL_ALREADY_EXISTS,
  AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID,
} from './auth.constants';
import * as bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  /* async login(logInDto: any) {
    const payload = {
      sub: logInDto.uuid,
      username: logInDto.username,
      role: logInDto.role,
    };

    const secretKey = environment.secretKey;

    if (!secretKey) {
      throw new Error('No se ha proporcionado una clave secreta para JWT');
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  } */

  /* Register a new user */

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const email = signUpDto.email ? signUpDto.email.trim() : null;
    let password = signUpDto.password ? signUpDto.password.trim() : null;
    let user: User = await this.userService.usersRepository.findOne({
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

    user = await this.userService.usersRepository.save(newUser);
  }

  /* Login user */

  async login(logInDto: LogInDto): Promise<JwtTokenDto> {
    const email = logInDto.email ? logInDto.email.trim() : null;
    const password = logInDto.password ? logInDto.password.trim() : null;

    const user: User = await this.userService.usersRepository.findOne({
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
    return this.createJwtToken({ id: user.uuid, date: new Date() });
  }

  /* Create a new session */
  private createJwtToken(jwtPayload: JwtPayload): JwtTokenDto {
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
