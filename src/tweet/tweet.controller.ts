import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('tweets')
export class TweetController {
  constructor(private readonly authService: AuthService) {}

  @Post('tweet')
  @UseGuards(JwtAuthGuard)
  async tweet(@Req() request: any, @Body() body: { tweetContent: string }) {
    const user = request.user; 

    const tweetUrl = 'https://clicktotweet.com/54Qdy';

    const result = await this.authService.postTweet(tweetUrl, body.tweetContent, user);

    return {
      message: 'Tweet posted successfully',
      result,
    };
  }
}
