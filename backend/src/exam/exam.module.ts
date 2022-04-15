import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { Exam } from './exam.model';
import { ExamService } from './exam.service';

@Module({
    imports: [TypeOrmModule.forFeature([Exam])],
    controllers: [ExamController],
    providers: [ExamService],
    exports: [TypeOrmModule]
})
export class ExamModule { }