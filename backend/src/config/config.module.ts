import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './logger.model';
import { MyLogger } from './logger.service';


@Module({
    imports: [TypeOrmModule.forFeature([Logger])],
    providers: [MyLogger],
    exports: [MyLogger]
})
export class LoggerModule { }