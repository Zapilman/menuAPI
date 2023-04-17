import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { USER_NOT_FOUND_ERROR } from './auth.constants';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.authModel({
      login: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.authModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    return { email: user.login };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
