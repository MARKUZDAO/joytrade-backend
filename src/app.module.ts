import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/user.entity';
import { Bet } from './database/bet.entity';
import { Position } from './database/position.entity';
import { PacificaModule } from './pacifica/pacifica.module';

@Module({
  imports: [
    // Этот блок настраивает подключение к базе данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Берем адрес из настроек Render
      entities: [User, Bet, Position],
      synchronize: true, // Автоматически создает/обновляет таблицы в БД
      ssl: {
        rejectUnauthorized: false, // Необходимо для подключения к Render DB
      },
    }),
    
    // Этот блок подключает наш новый "Отдел Pacifica"
    PacificaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
