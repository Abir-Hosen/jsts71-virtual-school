import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { CourseDto } from './course.dto';
import { Course } from './course.model';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private repository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async save_course(course: CourseDto) {
    return await this.repository.save(course)
  }

  async fetch_all_course() {
    return await this.repository.find()
  }

  async fetch_teacher_course(id: number) {
    return await this.repository.find({
      where: {
        teacher: id
      }
    })
  }

  async fetch_course_by_user(id: number) {
    let user_ex = await this.userRepository.find({ id: id })
    return user_ex[0]
  }

  async take_course(course: CourseDto) {
    let course_ex = await this.repository.find({ id: course.id })
    let user_ex = await this.userRepository.find({ id: course.student_id })
    user_ex[0].courses.push(course_ex[0])

    this.userRepository.save(user_ex)
    // await this.repository.save(course_ex)
    return ''
  }

}