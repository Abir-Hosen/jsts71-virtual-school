import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.model';

@Injectable()
export class ExamService {
  
  constructor(
    @InjectRepository(Exam)
    private usersRepository: Repository<Exam>,
  ) { }
  async get_all_exams() {

  }

}
