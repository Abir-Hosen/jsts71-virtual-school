import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuestionDto } from './question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }
  

  @Post('create')
  async create_questions(@Body() questionDto: QuestionDto, @Res({ passthrough: true }) response: Response) {

    let resp;
    try {
      resp = await this.questionService.create_questions(questionDto)
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp
  }

  @Get('all')
  async get_all_questions() {
    return 'all_question';
  }

}
