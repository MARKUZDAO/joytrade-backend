import { Module } from '@nestjs/common';
import { PacificaService } from './pacifica.service';
import { PacificaGateway } from './pacifica.gateway';

@Module({
  providers: [PacificaService, PacificaGateway]
})
export class PacificaModule {}
