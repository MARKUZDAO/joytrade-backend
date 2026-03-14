import { Test, TestingModule } from '@nestjs/testing';
import { PacificaGateway } from './pacifica.gateway';

describe('PacificaGateway', () => {
  let gateway: PacificaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacificaGateway],
    }).compile();

    gateway = module.get<PacificaGateway>(PacificaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
