import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  twitterLink: string;

  @Column({ nullable: true })
  mediaUrl: string;
}
