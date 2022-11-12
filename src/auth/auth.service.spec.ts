import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type UsersServiceMock = {
  findByEmail: jest.Mock;
  findOne: jest.Mock;
};

type JwtServiceMock = {
  sign: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersServiceMock;
  let jwtService: JwtServiceMock;
  let user;

  beforeEach(async () => {
    user = {
      id: '1',
      email: 'mo@example.com',
      password: '123456',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(() => user),
            findOne: jest.fn(() => user),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'token'),
          },
        },
      ],
    }).compile();
    jest
      .spyOn(bcrypt, 'compareSync')
      .mockImplementation(
        (password, hashedPasswod) => password === hashedPasswod,
      );
    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersServiceMock>(UsersService);
    jwtService = module.get<JwtServiceMock>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('usersService should be defined', () => {
    expect(usersService).toBeDefined();
  });
  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });
  describe('validateUser', () => {
    it('should return a user token', async () => {
      const result = await service.validateUser(user.email, user.password);
      expect(usersService.findByEmail).toBeCalledWith(user.email);
      expect(bcrypt.compareSync).toBeCalledWith(user.password, user.password);
      expect(result).toEqual({ token: 'token', sub: '1' });
    });
    it('should return null', async () => {
      const result = await service.validateUser(user.email, '1234567');
      expect(usersService.findByEmail).toBeCalledWith(user.email);
      expect(bcrypt.compareSync).toBeCalledWith('1234567', user.password);
      expect(result).toEqual(null);
    });
  });
  describe('login', () => {
    it('should return a user token', async () => {
      const result = await service.login(user);
      expect(jwtService.sign).toBeCalledWith({ sub: user.id });
      expect(result).toEqual({ token: 'token', sub: '1' });
    });
  });
});
