import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/utils/response.interceptor';
import { AllExceptionsFilter } from '@/utils/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api');

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor(), new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
