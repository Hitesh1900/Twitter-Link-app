import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import {HttpService} from '@nestjs/axios';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class AuthService {
    [x: string]: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly tweetService: TweetService,
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

      return !!decoded;
    } catch (e) {
      return false;
    }
  }
  
  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
      id:user.id
    };
  }

    async postTweet(text: string, mediaUrl?: string): Promise<any> {
    let tweetText = encodeURIComponent(text);
    if (mediaUrl) {
      tweetText += `&media=${encodeURIComponent(mediaUrl)}`;
    }
    const tweetUrl = `https://x.com/intent/post?text=${tweetText}&original_referer=https%3A%2F%2Fclicktotweet.com&related=clicktotweet`;
    return { tweetUrl };
  }


  async saveTweet(text: string, mediaUrl: string, userId: number): Promise<any> {
    return this.tweetService.createTweet({ text, mediaUrl }, userId);
  }
}
  

