import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [TypeOrmModule]
})
export class QuestionModule { }