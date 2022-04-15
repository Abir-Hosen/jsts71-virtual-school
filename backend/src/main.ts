import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './config/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  await app.enableCors();
  await app.listen(3050);
}
bootstrap();
