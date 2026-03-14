import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Наш внутренний ID

  @Column()
  pacificaPositionId: string; // ID позиции от Pacifica

  @Column()
  side: 'long' | 'short';

  @Column('decimal')
  size: number;

  @Column('decimal')
  entryPrice: number;

  @Column('decimal')
  takeProfit: number;

  @Column('decimal')
  stopLoss: number;

  @Column()
  status: 'open' | 'closed';
}
