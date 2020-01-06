import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        /\.jiwai\.win$/,
        /^http:\/\/localhost/,
        /^https:\/\/uni\-sso\.herokuapp\.com/,
      ],
      methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
