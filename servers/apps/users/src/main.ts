import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);

  // Konfigurasi CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Ganti dengan domain frontend Anda
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Metode yang diizinkan
    credentials: true, // Izinkan cookie atau header authentication
  });

  // Set static assets dan view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
  app.setViewEngine('ejs');

  await app.listen(4001);
}
bootstrap();
