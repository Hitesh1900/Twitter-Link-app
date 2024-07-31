import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'custom-twitter') {
  constructor() {
    super({
      consumerKey: 'dummy-consumer-key', 
      consumerSecret: 'dummy-consumer-secret',
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
    const user = {
      twitterId: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      token, 
      tokenSecret,
    };
    done(null, user);
  }
}
