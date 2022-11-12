import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
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
    if (user && bcryptjs.compareSync(pass, user.password)) {
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
}
