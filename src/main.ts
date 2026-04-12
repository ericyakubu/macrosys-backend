import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalValidationPipe } from './infrastructure/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.use(cookieParser());

  const instance = app.getHttpAdapter().getInstance();

  instance.use((req, res, next) => {
    console.log(req.url);

    next();
  });

  app.useGlobalPipes(new GlobalValidationPipe());

  // Why it's called "Macrosys"?
  // Because it's a system that is used to manage macros.

  const config = new DocumentBuilder()
    .setTitle('Macrosys docs')
    .setDescription('The macrosys API description')
    .setVersion('1.0')
    // .addTag('cats')
    // .addGlobalParameters({
    //   name: 'tenantId',
    //   in: 'header',
    // })
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
