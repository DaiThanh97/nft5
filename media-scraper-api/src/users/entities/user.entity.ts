import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { VideoEntity } from '../../videos/entities/video.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Index('IDX_ID')
  id!: number;

  @Column({ unique: true })
  @Index('IDX_USERNAME')
  username!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column()
  name!: string;

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos!: VideoEntity[];

  @CreateDateColumn()
  createDate!: Date;
}
