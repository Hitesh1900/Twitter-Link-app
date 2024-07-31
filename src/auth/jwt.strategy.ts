// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abcdefghijklmauioo', // Replace with your actual secret
    });
  }

  async validate(payload: JwtPayload) {
    // Here you can add logic to find the user from the database
    // For example: return this.usersService.findById(payload.sub);
    return { userId: payload.sub, username: payload.username };
  }
}
