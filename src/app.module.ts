import { Module } from '@nestjs/common';
import { YerbaMateModule } from './yerba-mate/yerba-mate.module';
import { UserVoteModule } from './user-vote/user-vote.module';
import { UserModule } from './user/user.module';
import { ProcessingMethodModule } from './processing-method/processing-method.module';
import { OriginModule } from './origin/origin.module';
import { FlavorModule } from './flavor/flavor.module';
import { CountryModule } from './country/country.module';
import { BrandModule } from './brand/brand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // TODO: Set to false in production
      logging: true,
    }),
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
