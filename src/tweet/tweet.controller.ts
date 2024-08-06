import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { TweetDto } from './tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async tweet(@Req() request: any, @Body() tweetDto: TweetDto) {
    const user = request.user; 
    const { text, mediaUrl } = tweetDto;

    // Save the tweet and generate a URL
    await this.authService.saveTweet(text, mediaUrl, user.id);

    // Generate the tweet URL
    const result = await this.authService.postTweet(text, mediaUrl);

    return {
      message: 'Tweet saved and URL generated successfully',
      result,
    };
  }
}
