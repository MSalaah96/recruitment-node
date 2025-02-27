import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan-body';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const APP_NAME = process.env.npm_package_name || 'carbon-application';
  const APP_VERSION = process.env.npm_package_version || '1.0.0';
  const APP_PORT = process.env.APP_PORT || 8080;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.use(helmet());

  const logger = app.get(Logger);
  (morgan as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        logger.log(message.replace('\n', ''));
        return true;
      },
    },
    logRequestId: true,
    logAllReqHeader: true,
    filterParameters: [],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException({
          message: `exceptions.INVALID_REQUEST_MESSAGE`,
          errors: errors.reduce(
            (allConstraints, error) => [
              ...allConstraints,
              ...(error.constraints ? Object.values(error.constraints) : []),
            ],
            [],
          ),
        });
      },
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(
          `${APP_NAME} API to get users carbon certificates and transfer it between them`,
        )
        .addBearerAuth()
        .setVersion(APP_VERSION)
        .build(),
    );

    SwaggerModule.setup('docs', app, document, {
      customCss: '.swagger-ui .topbar { display: none }',
    });
  }

  app.enableCors();

  await app.listen(APP_PORT, '0.0.0.0');
  console.log(`carbon-application is running on: ${await app.getUrl()}`);
}
bootstrap();
