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

  async save_course(course: Course): Promise<Course> {
    return await this.repository.save(course)
  }

  async fetch_all_course() {
    return await this.repository.find()
  }

  async fetch_teacher_course(id:number) {
    return await this.repository.find({where:{
      teacher:id
    }})
  }
  
  async fetch_course_by_user(id:number) {
    let user_ex = await this.userRepository.find({id:id})
    return user_ex[0]
  }
  
  async take_course(course: CourseDto) {
    let course_ex = await this.repository.findOne(course.id)
    course.student.forEach(async (student)=>{
      let user_ex = await this.userRepository.findOne(student)
      course_ex.student.push(user_ex)
    })
    return await this.repository.save(course_ex)
  }

}
