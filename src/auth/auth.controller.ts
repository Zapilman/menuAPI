import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException('user already exists');
    }
    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const { email } = await this.authService.validateUser(
      dto.login,
      dto.password,
    );
    return this.authService.login(email);
  }
}
