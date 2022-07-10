import { HttpStatus, Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { YoutubeError } from '../../../common/errors/youtube.error';
import { YoutubeResponse } from './youtube.interface';

@Injectable()
export class YoutubeService {
  private GOOGLE_APIS_URL!: string;
  private YOUTUBE_API_KEY!: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.GOOGLE_APIS_URL = configService.get<string>('GOOGLE_APIS_URL') ?? '';
    this.YOUTUBE_API_KEY = configService.get<string>('YOUTUBE_API_KEY') ?? '';
  }

  async getDataFromYoutube(url: string): Promise<YoutubeResponse | null> {
    try {
      let videoId = url.split('v=')[1];
      const ampersandPos = videoId.indexOf('&');
      if (ampersandPos !== -1) {
        videoId = videoId.substring(0, ampersandPos);
      }

      // Call Get Data
      const { status, data } = await axios.get(
        `${this.GOOGLE_APIS_URL}?id=${videoId}&key=${this.YOUTUBE_API_KEY}&part=snippet,statistics`,
      );

      if (status === HttpStatus.OK) {
        const { snippet, statistics } = data.items[0];
        const youtubeData: YoutubeResponse = {
          title: snippet.title,
          likeCount: statistics.likeCount,
          viewCount: statistics.viewCount,
          commentCount: statistics.commentCount,
          description: snippet.description,
          imageUrl: snippet.thumbnails.medium.url,
          url,
        };
        return youtubeData;
      }
    } catch (err) {
      throw new YoutubeError('Request youtube failed!');
    }
    return null;
  }
}
