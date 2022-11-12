import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<UserEntity>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
  describe('findOne', () => {
    it('should return a user', async () => {
      service.findOne('1');
      expect(usersRepository.findOneBy).toBeCalledWith({ id: '1' });
    });
  });
  describe('findByEmail', () => {
    it('should return a user', async () => {
      const email = 'mo@example.com';
      service.findByEmail(email);
      expect(usersRepository.findOneBy).toBeCalledWith({ email });
    });
  });
});
