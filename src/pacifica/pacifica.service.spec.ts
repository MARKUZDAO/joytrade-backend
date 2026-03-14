import { Test, TestingModule } from '@nestjs/testing';
import { PacificaService } from './pacifica.service';

describe('PacificaService', () => {
  let service: PacificaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacificaService],
    }).compile();

    service = module.get<PacificaService>(PacificaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
