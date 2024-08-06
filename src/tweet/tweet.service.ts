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

    // Create a new Tweet entity
    const tweet = this.entityManager.create(Tweet, {
      text,
      mediaUrl,
      userId,
    });

    // Save the tweet to the database
    return await this.entityManager.save(tweet);
  }
}
