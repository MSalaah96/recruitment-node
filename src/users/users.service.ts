import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }
}
