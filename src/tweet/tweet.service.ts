import { Injectable } from '@nestjs/common';
import {  InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { TweetDto } from './tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createTweet(tweetDto: TweetDto, userId: number): Promise<Tweet> {
    const { text, mediaUrl } = tweetDto;
    const tweet = this.entityManager.create(Tweet, {
      text,
      mediaUrl,
      userId,
    });
    return await this.entityManager.save(tweet);
  }

  async countUserTweets(userId: number): Promise<number> {
    const result = await this.entityManager.createQueryBuilder(Tweet, 'tweet')
      .where('tweet.userId = :userId', { userId })
      .getCount();
      
    return result;
  }
}
