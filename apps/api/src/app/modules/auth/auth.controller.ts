import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../shared/enum/role.enum';
import { RolesGuard } from '../../core/guards/roles.guard';
import { RequestWithUser } from '../../shared/dto/get-user.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.validateUser(createUserDto);

    return this.authService.login(user);
  }

  @Post('logout')
  logout() {
    return 'This action removes a # auth';
  }

  
  @Get('profile')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getProfile(@Req() req: RequestWithUser) {    
    return this.authService.validateUser(req.user);
  }



  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
