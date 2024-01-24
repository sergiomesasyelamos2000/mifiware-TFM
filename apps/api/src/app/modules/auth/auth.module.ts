import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@mifiware-tfm/entity-data-models';
import environment from '../../../environments/environment';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: environment.secretKey,
      signOptions: { expiresIn: '3000s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
