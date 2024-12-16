import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    // logger: ['error', 'warn', 'debug', 'fatal','verbose']
  });
  const acceptedUrls = process.env.ACCEPTED_URLS?.split(", ");


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  // console.log({acceptedUrls})
  app.enableCors({
    origin: acceptedUrls
  });

  // console.log(process.env.PORT);
  const PORT = process.env.PORT || '4041';
  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}
bootstrap();
