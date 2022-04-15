import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { CourseController } from './course.controller';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course]), TypeOrmModule.forFeature([User])],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [TypeOrmModule]
})
export class CourseModule { }