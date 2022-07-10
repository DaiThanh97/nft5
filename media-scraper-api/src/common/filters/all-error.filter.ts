import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateUserError } from '../errors/create-user.error';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { ShareVideoError } from '../errors/share-video.error';
import { UsernameExistedError } from '../errors/username-existed.error';
import { YoutubeError } from '../errors/youtube.error';

@Catch()
export class AllErrorFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(error);

    const statusCode = this.getStatusCode(error);
    response.status(statusCode).json({
      statusCode,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getStatusCode(error: Error): number {
    let code: number = HttpStatus.INTERNAL_SERVER_ERROR;
    if (error instanceof HttpException) {
      code = error.getStatus();
    } else {
      switch (error.constructor) {
        case UsernameExistedError:
          code = HttpStatus.BAD_REQUEST;
          break;
        case YoutubeError:
        case ShareVideoError:
        case CreateUserError:
          code = HttpStatus.INTERNAL_SERVER_ERROR;
          break;
        case InvalidCredentialsError:
          code = HttpStatus.UNAUTHORIZED;
          break;
      }
    }
    return code;
  }
}
