import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './shared/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    logging: ['error', 'warn'],
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'tfm',
    synchronize: true,
    charset: 'utf8mb4',
    entities: [User]
  }), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
