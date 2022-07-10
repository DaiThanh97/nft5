import { CurrentUser } from 'src/users/interfaces/user.interface';
import { EntityRepository, Repository, Like } from 'typeorm';
import { VideoEntity } from './entities/video.entity';
import { CreateVideo } from './interfaces/create-video.interface';

@EntityRepository(VideoEntity)
export class VideosRepository extends Repository<VideoEntity> {
  async getAll(page: number, count: number, search = '') {
    const result = await this.find({
      take: count,
      skip: (page - 1) * count,
      order: {
        id: 'DESC',
      },
      where: {
        title: Like(`%${search}%`),
      },
    });

    return {
      listMovies: result,
      totalMovie: result.length,
    };
  }

  async createVideo(
    createVideo: CreateVideo[],
    user: CurrentUser,
  ): Promise<VideoEntity[]> {
    const videos: VideoEntity[] = [];
    createVideo.forEach((video) => {
      const vid = this.create({
        title: video.title,
        likeCount: video.likeCount,
        viewCount: video.viewCount,
        commentCount: video.commentCount,
        description: video.description,
        imageUrl: video.imageUrl,
        url: video.url,
        user,
      });
      videos.push(vid);
    });

    await this.save(videos);
    return videos;
  }
}
