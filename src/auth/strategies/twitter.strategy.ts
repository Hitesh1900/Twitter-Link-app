// src/auth/strategies/custom-twitter.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'custom-twitter') {
  constructor() {
    super({
      // Use the provided authentication link directly if applicable
      // Adjust these options as needed for the custom strategy
      consumerKey: 'dummy-consumer-key', // Placeholder, not used
      consumerSecret: 'dummy-consumer-secret', // Placeholder, not used
      callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback',
      includeEmail: true,
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: VerifyCallback,
  ) {
    // Extract relevant information from profile
    const user = {
      twitterId: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      token, // Include token if needed
      tokenSecret, // Include tokenSecret if needed
    };

    // Perform any custom validation or processing here

    done(null, user);
  }
}
