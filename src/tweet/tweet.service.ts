import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService {
  async createTweet(content: string, userId: string, mediaPath?: string): Promise<any> {
    return { content, userId, mediaPath };
  }
}
