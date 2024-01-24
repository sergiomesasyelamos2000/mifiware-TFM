import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  } */
}
