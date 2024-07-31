import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('tweets')
export class TweetController {
  constructor(private readonly authService: AuthService) {}

  @Post('tweet')
  @UseGuards(JwtAuthGuard)
  async tweet(@Req() request: any, @Body() body: { tweetContent: string }) {
    const user = request.user; // Access user data from token

    // Your logic to post a tweet using the ClickToTweet service
    const tweetUrl = 'https://clicktotweet.com/54Qdy';

    // Perform the tweet action
    const result = await this.authService.postTweet(tweetUrl, body.tweetContent, user);

    return {
      message: 'Tweet posted successfully',
      result,
    };
  }
}
