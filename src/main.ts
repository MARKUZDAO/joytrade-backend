import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'; // <--- МЫ ДОБАВИЛИ ЭТУ СТРОКУ

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ИСПОЛЬЗУЕМ НОВУЮ "ТРАНСМИССИЮ" ---
  app.useWebSocketAdapter(new WsAdapter(app)); 
  // ------------------------------------

  // Render использует переменную PORT для запуска. 
  // Локально будет использоваться порт 3000.
  await app.listen(process.env.PORT || 3000); 
}
bootstrap();
