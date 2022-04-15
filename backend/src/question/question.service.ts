import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDto } from './question.dto';
import { Question } from './question.model';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
  ) { }

  async create_questions(question: QuestionDto) {
      return await this.repository.save(question)
  }

  async get_all_questions() {

  }

}
