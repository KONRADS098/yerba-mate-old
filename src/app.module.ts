import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YerbaMateModule } from './yerba-mate/yerba-mate.module';
import { UserVoteModule } from './user-vote/user-vote.module';
import { UserModule } from './user/user.module';
import { ProcessingMethodModule } from './processing-method/processing-method.module';
import { OriginModule } from './origin/origin.module';
import { FlavorModule } from './flavor/flavor.module';
import { CountryModule } from './country/country.module';
import { BrandModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: true,
      }),
      inject: [ConfigService],
    }),
    YerbaMateModule,
    BrandModule,
    CountryModule,
    FlavorModule,
    OriginModule,
    ProcessingMethodModule,
    UserModule,
    UserVoteModule,
    AuthModule,
  ],
})
export class AppModule {}
