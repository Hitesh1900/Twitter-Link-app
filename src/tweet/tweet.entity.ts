import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  mediaUrl?: string;

  @Column()
  userId: number;
}
