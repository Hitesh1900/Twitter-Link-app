import { User } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        twitterId: string;
        username: string;
        displayName: string;
        email: string;
        token: string;
        tokenSecret: string;
      };
    }
  }
}
