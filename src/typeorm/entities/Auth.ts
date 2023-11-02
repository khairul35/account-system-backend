import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Auths' })
export class Auth {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  session_id: number;

  @Column()
  user_id: number;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column({ type: 'timestamp', default: () => `DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 MONTH)` })
  expired_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}