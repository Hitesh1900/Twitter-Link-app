import { Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { TweetController } from './tweet.controller';
import { JwtAuthGuard } from '../jwt.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [HttpModule, UserModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [TweetController],
})
export class TweetModule {}
