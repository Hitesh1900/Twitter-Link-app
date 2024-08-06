import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();
import { AuthController } from './auth.controller'; 
import { TweetModule } from 'src/tweet/tweet.module';
import { TweetService } from 'src/tweet/tweet.service';

@Module({
  imports: [HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    TweetModule,
  ],
  providers: [AuthService,JwtStrategy,TweetService],
  controllers: [AuthController], 
  exports: [AuthService],
})
export class AuthModule {}
