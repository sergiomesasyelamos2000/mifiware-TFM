import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@mifiware-tfm/entity-data-models';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LocationUser,
  LocationUserSchema,
} from './entities/location-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: LocationUser.name, schema: LocationUserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
