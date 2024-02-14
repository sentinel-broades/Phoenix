import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import * as winston from 'winston';
import { ILogger } from './interfaces/ILogger';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger extends Logger implements ILogger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string) {
    this.logger.level = 'info';
    this.logger.info(message, { context: this.context });
  }

  warn(message: string) {
    this.logger.level = 'warn';
    this.logger.warn(message, { context: this.context });
  }

  error(message: string) {
    this.logger.level = 'error';
    this.logger.error(message, { context: this.context });
  }

  httpError(message: string, error: string) {
    this.error(error);
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  createEntityError(error: any, entity: string) {
    this.log(error);

    if (error?.code === '23505')
      throw new ConflictException(
        `${entity} with specified name already exists`,
      );

    this.httpError(`An error occurred creating ${entity}`, error);
  }
}
