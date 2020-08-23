import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppConfigKey, AppHelper } from '@solness/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: AppHelper.getConfig(AppConfigKey.DefaultLink),
  });
  await app.listen(5000);
}
bootstrap();
