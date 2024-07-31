import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule if needed
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();
import { AuthController } from './auth.controller'; // Include AuthController if needed

@Module({
  imports: [HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule, // Import the module containing UserService
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController], // Include AuthController if it exists
  exports: [AuthService],
})
export class AuthModule {}
