import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal')
  stake: number;

  @Column('decimal')
  multiplier: number;

  @Column()
  positionId: string; // ID позиции на Pacifica

  @Column()
  status: 'active' | 'won' | 'lost' | 'expired';

  @CreateDateColumn()
  createdAt: Date;
}
