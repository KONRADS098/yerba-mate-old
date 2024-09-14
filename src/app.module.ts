// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CountryModule } from './country/country.module';
import { DatabaseModule } from './database.module';
import { FlavorModule } from './flavor/flavor.module';
import { OriginModule } from './origin/origin.module';
import { ProcessingMethodModule } from './processing-method/processing-method.module';
import { RedisModule } from './redis.module';
import { UserVoteModule } from './user-vote/user-vote.module';
import { UserModule } from './user/user.module';
import { YerbaMateModule } from './yerba-mate/yerba-mate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule,
    AuthModule,
    YerbaMateModule,
    BrandModule,
    CountryModule,
    FlavorModule,
    OriginModule,
    ProcessingMethodModule,
    UserModule,
    UserVoteModule,
  ],
})
export class AppModule {}
