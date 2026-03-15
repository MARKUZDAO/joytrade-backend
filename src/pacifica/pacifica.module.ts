import { Module } from '@nestjs/common';
import { PacificaService } from './pacifica.service';
import { PacificaGateway } from './pacifica.gateway';

@Module({
  providers: [PacificaGateway, PacificaService],
  exports: [PacificaService], // Экспортируем сервис, чтобы другие могли его использовать
})
export class PacificaModule {}
