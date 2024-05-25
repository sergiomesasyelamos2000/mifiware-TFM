import {
  CreateUserDto,
  Role,
  UpdateUserDto,
  User,
} from '@mifiware-tfm/entity-data-models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../core/decorators/roles.decorator';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('mongo')
  getUserIdMongo() {
    return this.userService.getAllUsers();
  }

  @Get('dashboard/binary')
  //@Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getGrafanaDashboardUrlBinray(@Req() req: any): string {
    return this.userService.getGrafanaUrlBinary(req?.user);
  }

  @Get('dashboard/location')
  //@Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getGrafanaDashboardUrlLocation(@Req() req: any): string {
    return this.userService.getGrafanaUrlLocation(req?.user);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 200, description: 'Returns a list of all users.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully removed.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Delete()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully removed.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async bulkDelete(@Body() users: User[]) {
    return this.userService.bulkDelete(users);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Returns a specific user.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(200)
  async findOne(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }
}
