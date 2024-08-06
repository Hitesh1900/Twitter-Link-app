import { Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { TweetController } from './tweet.controller';
import { JwtAuthGuard } from '../jwt.guard';
import { UserModule } from 'src/user/user.module';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Tweet } from './tweet.entity';

@Module({
  imports: [HttpModule, UserModule,
    JwtModule.register({
      secret: 'abcdefghijklmauioo',
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
    TypeOrmModule.forFeature([Tweet])
  ],
  providers: [AuthService, JwtAuthGuard,TweetService],
  controllers: [TweetController],
  exports:[TweetService],
})
export class TweetModule {}
