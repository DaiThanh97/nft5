import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/interfaces/user.interface';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ShareVideoDto } from './dtos/share-video.dto';
import { VideosService } from './videos.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetVideosDto } from './dtos/get-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all videos' })
  getAll(@Query() getVideosDto: GetVideosDto) {
    return this.videosService.getAll(getVideosDto);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('Authentication')
  @ApiBody({ type: ShareVideoDto })
  @ApiCreatedResponse({ description: 'Share video' })
  @ApiUnauthorizedResponse({ description: 'Unauthenticated' })
  share(@Body() shareVideoDto: ShareVideoDto, @GetUser() user: CurrentUser) {
    return this.videosService.share(shareVideoDto, user);
  }
}
