import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ sub: string; token: string }> {
    const user = await this.usersService.findByEmail(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      console.log('user: ', user);
      return this.login(user);
    }
    return null;
  }

  async login(user: any): Promise<{ sub: string; token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      sub: user.id,
    };
  }
  async register(data: any): Promise<{ sub: string; token: string }> {
    const user = await this.usersService.findByEmail(data.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    data.password = bcrypt.hashSync(data.password, 10);
    return this.login(await this.usersService.create(data));
  }
}
