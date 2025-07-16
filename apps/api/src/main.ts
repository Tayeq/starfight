import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new ApiKeyGuard());
  // Set trust proxy on Express instance to handle HTTPS correctly behind Traefik/Caddy
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  // Logger for debugging protocol and forwarded headers
  expressApp.use((req, res, next) => {
    console.log(
      'Request:',
      req.method,
      req.originalUrl,
      '| protocol:',
      req.protocol,
      '| x-forwarded-proto:',
      req.headers['x-forwarded-proto']
    );
    next();
  });

  await app.listen(3000);
}
bootstrap();
