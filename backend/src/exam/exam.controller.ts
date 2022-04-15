import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Get('all')
  async get_all_exams() {
    return 'all_exam';
  }

}
