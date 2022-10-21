import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  // parse cookies from header request.cookies['cookie-key'];
  app.use(cookieParser());

  // use dto validations
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    transform: true, // transform query and params from string -> number etc.
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  
  await app.listen(3000);
}
bootstrap();
