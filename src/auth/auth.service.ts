import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable()
export class AuthService {
    [x: string]: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async register(username: string, password: string): Promise<{ username: string; password: string }> {
    const user = await this.userService.create(username, password);
    const payload = { username, password };
    const token = this.jwtService.sign(payload);
    return { username, password };
  }

  private async generateToken(userId: number): Promise<string> {
    const payload: JwtPayload = {
        sub: userId,
        username: ''
    };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      // You might want to perform additional checks or validations here
      return !!decoded;
    } catch (e) {
      return false;
    }
  }
  
  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async postTweet(tweetUrl: string, tweetContent: string, user: any): Promise<any> {
    // Example logic to post a tweet
    try {
      // You may need to prepare the payload or headers according to ClickToTweet API
      const response = await lastValueFrom(this.httpService.post(tweetUrl, {
        content: tweetContent,
        user: user,
      }));
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to post tweet');
    }
  }
  
}
