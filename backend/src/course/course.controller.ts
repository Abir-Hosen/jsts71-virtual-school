import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CourseDto } from './course.dto';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('save_course')
  async create_course(@Body() courseDto: CourseDto, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.courseService.save_course(courseDto)
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp
  }


  @Get('fetch_teacher_course/:id')
  async fetch_teacher_course(@Param() params, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.courseService.fetch_teacher_course(params.id)
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }

  @Get('fetch_all_course')
  async fetch_all_course(@Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.courseService.fetch_all_course()
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }


  @Post('take_course')
  async take_course(@Body() courseDto: CourseDto, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.courseService.take_course(courseDto)
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }
    return resp;
  }


  @Get('fetch_course_by_user/:id')
  async fetch_course_by_user(@Param() params, @Res({ passthrough: true }) response: Response) {
    let resp;
    try {
      resp = await this.courseService.fetch_course_by_user(params.id)
      await response.status((HttpStatus.OK))
    } catch (err) {
      await response.status(400)
      resp = err;
    }

    return resp;
  }

}



