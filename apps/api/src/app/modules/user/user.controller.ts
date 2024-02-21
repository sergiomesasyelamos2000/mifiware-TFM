import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '@mifiware-tfm/entity-data-models';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  } */
  @Get('dashboard')
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  getGrafanaDashboardUrl(@Req() req: any): string {
    return this.userService.getGrafanaUrl(req?.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findOne(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }
}
