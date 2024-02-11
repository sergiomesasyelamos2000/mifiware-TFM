import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { environment } from '../../../environments/environment';
import { JwtPayload, User } from '@mifiware-tfm/entity-data-models';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /* sync canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: environment.secretKey,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  } */

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getJwtPayloadFromRequest(request: any): JwtPayload {
    if (
      request.headers &&
      request.headers.authorization &&
      request.headers.authorization.split(' ').length === 2
    ) {
      console.log('entra en if');

      const jwtTokenType = request.headers.authorization.split(' ')[0];
      const jwtToken = request.headers.authorization.split(' ')[1];
      if (
        jwtToken &&
        jwtTokenType &&
        jwtTokenType.toLowerCase() === environment.auth.tokenType.toLowerCase()
      ) {
        try {
          return jwt.verify(
            jwtToken,
            environment.auth.accessToken.secretKey
          ) as JwtPayload;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtPayload = this.getJwtPayloadFromRequest(request);
    console.log('user', jwtPayload);
    if (jwtPayload) {
      request.jwtPayload = jwtPayload;
      if (!jwtPayload.id) {
        throw new UnauthorizedException();
      }
      if (!request.user) {
        const user = await this.userRepository.findOne({
          where: { uuid: jwtPayload.id },
        });
        if (user) {
          request.user = user;
          console.log('user', user);
        } else {
          throw new UnauthorizedException();
        }
      }
      return true;
    }

    throw new UnauthorizedException();
  }
}
