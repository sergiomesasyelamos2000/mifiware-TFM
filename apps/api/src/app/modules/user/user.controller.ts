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

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findOne(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Get(':userId/dashboard')
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  getGrafanaDashboardUrl(
    @Param('userId') userId: string,
    @Req() req: Request
  ): string {
    console.log('userId', userId);

    // Filter the dashboard by the user's ID
    const grafanaUrl = `http://localhost:3003/d/a755de72-d8b9-42a8-86d4-53b2d2c378a4/sensores-de-localizacion?orgId=1&var-user_id=${userId}&from=1707636483388&to=1707658083388`;

    return grafanaUrl;
  }
}
