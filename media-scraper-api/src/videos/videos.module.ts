import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { YoutubeService } from './services/youtube/youtube.service';
import { VideosController } from './videos.controller';
import { VideosRepository } from './videos.repository';
import { VideosService } from './videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideosRepository]), AuthModule],
  controllers: [VideosController],
  providers: [VideosService, YoutubeService],
})
export class VideosModule {}
