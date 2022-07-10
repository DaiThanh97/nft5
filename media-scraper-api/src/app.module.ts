import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ENV_CONFIG, validate } from './configs/env';
import { APP_FILTER } from '@nestjs/core';
import { AllErrorFilter } from './common/filters/all-error.filter';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { LoggerMiddleware } from './common/middlewares/request-logger.middleware';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIG],
      isGlobal: true,
      cache: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: !configService.get<string>('isProd'),
        logging: !configService.get<string>('isProd'),
        migrations: [__dirname + '/migration/**/*.{js,ts}'],
        retryAttempts: 3,
        retryDelay: 3000,
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      }),
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        level: configService.get<string>('LOG_LEVEL'),
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          format.colorize(),
          format.simple(),
        ),
        transports: new transports.Console({
          stderrLevels: ['error'],
          consoleWarnLevels: ['warn'],
        }),
        exceptionHandlers: new transports.Console(),
        exitOnError: false,
      }),
    }),
    AuthModule,
    UsersModule,
    VideosModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
