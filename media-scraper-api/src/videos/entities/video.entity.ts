import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'videos' })
export class VideoEntity {
  @PrimaryGeneratedColumn()
  @Index('IDX_ID')
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  likeCount!: number;

  @Column()
  viewCount!: number;

  @Column()
  commentCount!: number;

  @Column()
  imageUrl!: string;

  @Column()
  url!: string;

  @CreateDateColumn()
  createDate!: Date;

  @ManyToOne(() => UserEntity, (user) => user.videos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user!: UserEntity;
}
