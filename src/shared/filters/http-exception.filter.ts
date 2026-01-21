import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../errors/error-codes';
import { ApiResponse } from '../interfaces/api-response';
import { ApiMeta } from '../interfaces/api-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = isHttpException ? exception.getResponse() : null;
    const normalized =
      typeof responseBody === 'string' ? { message: responseBody } : responseBody;

    const message =
      (normalized as { message?: string })?.message ?? 'Internal server error';
    const details = (normalized as { details?: unknown })?.details;
    const errorCode =
      (normalized as { errorCode?: string })?.errorCode ?? mapStatusToErrorCode(status);

    const meta: ApiMeta = {
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    const payload: ApiResponse<null> = {
      success: false,
      error: {
        code: errorCode,
        message,
        details,
      },
      meta,
    };

    response.status(status).json(payload);
  }
}

function mapStatusToErrorCode(status: number): ErrorCode {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return ErrorCode.BadRequest;
    case HttpStatus.UNAUTHORIZED:
      return ErrorCode.Unauthorized;
    case HttpStatus.FORBIDDEN:
      return ErrorCode.Forbidden;
    case HttpStatus.NOT_FOUND:
      return ErrorCode.NotFound;
    case HttpStatus.CONFLICT:
      return ErrorCode.Conflict;
    case HttpStatus.TOO_MANY_REQUESTS:
      return ErrorCode.RateLimited;
    default:
      return ErrorCode.InternalServerError;
  }
}
