import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareVideoError } from 'src/common/errors/share-video.error';
import { CurrentUser } from '../users/interfaces/user.interface';
import { GetVideosDto } from './dtos/get-video.dto';
import { ShareVideoDto } from './dtos/share-video.dto';
import { VideoEntity } from './entities/video.entity';
import { CreateVideo } from './interfaces/create-video.interface';
import { GetVideosResponse } from './interfaces/get-video.interface';
import { YoutubeService } from './services/youtube/youtube.service';
import { VideosRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideosRepository)
    private readonly videosRepository: VideosRepository,
    private readonly youtubeService: YoutubeService,
  ) {}

  async getAll(getVideosDto: GetVideosDto) {
    const { search, count, page } = getVideosDto;
    const { listMovies, totalMovie } = await this.videosRepository.getAll(
      page,
      count,
      search,
    );
    const response: GetVideosResponse<VideoEntity> = {
      movies: listMovies,
      totalMovie,
    };
    return response;
  }

  async share(
    shareVideoDto: ShareVideoDto,
    user: CurrentUser,
  ): Promise<VideoEntity[]> {
    const { urls } = shareVideoDto;
    try {
      const result = await Promise.all(
        urls.map((url) => this.youtubeService.getDataFromYoutube(url)),
      );
      const mappedResult: CreateVideo[] = result.map((res) => {
        const create: CreateVideo = {
          title: res?.title ?? '',
          description: res?.description ?? '',
          likeCount: res?.likeCount ?? 0,
          viewCount: res?.viewCount ?? 0,
          commentCount: res?.commentCount ?? 0,
          imageUrl: res?.imageUrl ?? '',
          url: res?.url ?? '',
        };
        return create;
      });
      return this.videosRepository.createVideo(mappedResult, user);
    } catch (err) {
      throw new ShareVideoError('Something went wrong when share videos!');
    }
  }
}
