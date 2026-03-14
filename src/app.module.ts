import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/user.entity';
import { Bet } from './database/bet.entity';
import { Position } from './database/position.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Берем адрес из настроек Render
      entities: [User, Bet, Position],
      synchronize: true, // ВАЖНО: автоматически создает/обновляет таблицы в БД
      ssl: {
        rejectUnauthorized: false, // Необходимо для подключения к Render DB
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
