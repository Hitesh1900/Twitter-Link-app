import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }): Promise<any> {

    const token = await this.authService.register(body.username, body.password);


    return {
      username: body.username,
      password: body.password, 
    };
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body);
  }
}
