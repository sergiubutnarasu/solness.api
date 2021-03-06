import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AppConfigKey,
  AppHelper,
  CommonSubscriber,
  Environment,
} from '@solness/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as modules from './modules';
import { RefreshToken } from '@solness/auth';

const appModules = [modules.UserModule, modules.AuthModule];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: AppHelper.getConfig(AppConfigKey.DatabaseHost),
      database: AppHelper.getConfig(AppConfigKey.DatabaseName),
      username: AppHelper.getConfig(AppConfigKey.DatabaseUser),
      password: AppHelper.getConfig(AppConfigKey.DatabasePassword),
      entities: [RefreshToken, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsRun: true,
      migrations: [__dirname + '/**/*.migration{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + 'migration',
      },
      subscribers: [CommonSubscriber],
      logging: AppHelper.checkEnvironment(Environment.Development),
    }),
    GraphQLModule.forRoot({
      debug: AppHelper.checkEnvironment(Environment.Development),
      playground: AppHelper.checkEnvironment(Environment.Development),
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ...appModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
