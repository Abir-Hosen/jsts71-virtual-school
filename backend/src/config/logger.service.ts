import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from './logger.model';

@Injectable()
export class MyLogger extends ConsoleLogger {

    constructor(
        @InjectRepository(Logger)
        private repository: Repository<Logger>,) {
        super()
    }

    log(message: any, ...optionalParams: any[]) {
        super.log(message)

        const currentDate = new Date();
        const timestamp = currentDate.getTime()
        this.repository.save({ type: 'log', message: message, time: timestamp.toString() })
    }

    warn(message: any, ...optionalParams: any[]) { }

    error(message: any, stack?: string, context?: string) {
        super.error(message, stack, context);
    }
}