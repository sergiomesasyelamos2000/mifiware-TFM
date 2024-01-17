import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../../shared/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Role } from '../../shared/enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
        { provide: UserService, useValue: { findByUsername: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access:token when login is successful', async () => {
      const user: User = {
        uuid: 'uuid',
        username: 'username',
        password: 'password',
        role: Role.USER,
      };
      const jwt = 'jwt';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(jwt);

      expect(await service.login(user)).toEqual({ access_token: jwt });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.uuid,
        username: user.username,
        role: user.role,
      });
    });
  });

  describe('valideUser', () => {
    it('should return a user when validateUser is successful', async () => {
      const payload = { username: 'username' };
      const user: User = {
        uuid: 'uuid',
        username: 'username',
        password: 'password',
        role: Role.USER,
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);

      expect(await service.validateUser(payload));
      expect(userService.findByUsername).toHaveBeenCalledWith(payload.username);
    });
  });
});
