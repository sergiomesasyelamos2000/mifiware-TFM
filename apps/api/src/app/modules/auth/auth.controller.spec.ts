import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../shared/dto/create-user.dto';
import { User } from '../../shared/entities/user.entity';
import { Role } from '../../shared/enum/role.enum';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            validateUser: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: UserService, useValue: { validateUser: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access_token when login is successful', async () => {
      const dto: CreateUserDto = { username: 'username', password: 'password' };
      const user: User = {
        uuid: 'uuid',
        username: 'username',
        password: 'password',
        role: Role.USER,
      };
      const jwt = { access_token: 'jwt' };

      jest.spyOn(userService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'login').mockResolvedValue(jwt);

      expect(await controller.login(dto)).toEqual(jwt);
      expect(userService.validateUser).toHaveBeenCalledWith(dto);
      expect(authService.login).toHaveBeenCalledWith(user);
    });
  });

  describe('getProfile', () => {
    it('should return a user when the request is valid', async () => {
      const req: any = {
        user: { email: 'email@example.com', role: Role.SUPER_ADMIN },
      };
      const user: User = {
        uuid: 'uuid',
        username: 'username',
        password: 'password',
        role: Role.SUPER_ADMIN,
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);

      expect(await controller.getProfile(req)).toEqual(user);
      expect(authService.validateUser).toHaveBeenCalledWith(req.user);
    });
  });
});
