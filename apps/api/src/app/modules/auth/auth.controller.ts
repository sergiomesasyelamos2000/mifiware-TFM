import {
  JwtTokenDto,
  LogInDto,
  SignUpDto,
} from '@mifiware-tfm/entity-data-models';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import {
  AUTH_ERROR_EMAIL_ALREADY_EXISTS,
  AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID,
  AUTH_ERROR_USER_NOT_VALIDATED,
} from './auth.constants';
import { AuthService } from './auth.service';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller(`auth`)
@ApiTags(`auth`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('signup')
  @ApiResponse({ status: 204, description: 'Empty response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: AUTH_ERROR_EMAIL_ALREADY_EXISTS })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(204)
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    type: JwtTokenDto,
    description: 'JWT Sesion Token',
  })
  @ApiResponse({
    status: 404,
    description: AUTH_ERROR_EMAIL_OR_PASSWORD_INVALID,
  })
  @ApiResponse({ status: 601, description: AUTH_ERROR_USER_NOT_VALIDATED })
  @HttpCode(200)
  async login(@Body() logInDto: LogInDto) {
    console.log('entra en la api', logInDto);

    return this.authService.login(logInDto).then((res) => {
      console.log('login', res);

      return res;
    });
  }

  @Post('logout')
  logout() {
    return 'This action removes a # auth';
  }

  /* @Get('profile')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getProfile(@Req() req: RequestWithUser) {
    return this.authService.validateUser(req.user);
  } */
}
